"use client";

import { useEffect, useMemo, useState } from "react";
import { formatFileSize } from "@/lib/site";
import type {
  ListingVideoRecord,
  TikTokConnectionSummary,
  TikTokUploadJobRecord,
} from "@/lib/tiktok";

type TikTokPanelProps = {
  listingId: string;
  listingTitle: string;
  configured: boolean;
  connection: TikTokConnectionSummary | null;
  videos: ListingVideoRecord[];
  jobs: TikTokUploadJobRecord[];
  callbackUrl: string;
};

type PublishState = {
  publishId: string;
  status: string;
  message: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function TikTokPanel({
  listingId,
  listingTitle,
  configured,
  connection,
  videos,
  jobs,
  callbackUrl,
}: TikTokPanelProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [publishState, setPublishState] = useState<PublishState | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isBusy, setIsBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const jobMap = useMemo(() => {
    const map = new Map<string, TikTokUploadJobRecord>();

    for (const job of jobs) {
      if (!map.has(job.listing_video_id)) {
        map.set(job.listing_video_id, job);
      }
    }

    return map;
  }, [jobs]);

  useEffect(() => {
    if (!publishState) {
      return;
    }

    if (["FAILED", "PUBLISH_COMPLETE", "SEND_TO_USER_INBOX"].includes(publishState.status)) {
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/tiktok/upload-status/${encodeURIComponent(publishState.publishId)}`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Unable to refresh TikTok status.");
        }

        setPublishState({
          publishId: publishState.publishId,
          status: payload.status,
          message: payload.message,
        });
      } catch (error) {
        setFeedback(error instanceof Error ? error.message : "Unable to refresh TikTok status.");
      }
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [publishState]);

  async function handleUploadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    if (!selectedFile) {
      setFeedback("Choose a video file before uploading a draft.");
      return;
    }

    setIsBusy(true);
    const formData = new FormData();
    formData.set("listingId", listingId);
    formData.set("file", selectedFile);

    try {
      const response = await fetch("/api/tiktok/upload-draft", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "The TikTok draft upload did not complete.");
      }

      setSelectedFile(null);
      setFeedback(payload.message);
      setPublishState({
        publishId: payload.publishId,
        status: payload.status,
        message: payload.message,
      });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "The TikTok draft upload did not complete.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleReuseVideo(listingVideoId: string) {
    setFeedback("");
    setIsBusy(true);
    const formData = new FormData();
    formData.set("listingId", listingId);
    formData.set("listingVideoId", listingVideoId);

    try {
      const response = await fetch("/api/tiktok/upload-draft", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "The TikTok draft upload did not complete.");
      }

      setFeedback(payload.message);
      setPublishState({
        publishId: payload.publishId,
        status: payload.status,
        message: payload.message,
      });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "The TikTok draft upload did not complete.");
    } finally {
      setIsBusy(false);
    }
  }

  async function handleStatusCheck(publishId: string) {
    setRefreshing(true);
    setFeedback("");

    try {
      const response = await fetch(`/api/tiktok/upload-status/${encodeURIComponent(publishId)}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to refresh TikTok status.");
      }

      setPublishState({
        publishId,
        status: payload.status,
        message: payload.message,
      });
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to refresh TikTok status.");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleDisconnect() {
    setFeedback("");
    setRefreshing(true);

    try {
      const response = await fetch("/api/tiktok/disconnect", {
        method: "POST",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to disconnect TikTok.");
      }

      window.location.reload();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to disconnect TikTok.");
      setRefreshing(false);
    }
  }

  async function handleRefreshToken() {
    setFeedback("");
    setRefreshing(true);

    try {
      const response = await fetch("/api/tiktok/refresh-token", {
        method: "POST",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to refresh the TikTok connection.");
      }

      setFeedback(payload.message || "TikTok connection refreshed.");
      window.location.reload();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to refresh the TikTok connection.");
      setRefreshing(false);
    }
  }

  return (
    <section className="space-y-5">
      <div className="rounded-[1.75rem] border border-[#d8e5ee] bg-white px-6 py-5 shadow-[0_18px_40px_rgba(7,41,66,0.08)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
              TikTok Draft Uploads
            </p>
            <h3 className="display-font mt-2 text-[2rem] leading-none text-[#0c3553]">
              Send property videos to TikTok as drafts
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#587286]">
              Use this protected workflow to connect an authorized TikTok account, store original listing videos, and send them to TikTok as drafts for final review and posting.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {configured ? (
              connection ? (
                <>
                  <button
                    type="button"
                    onClick={handleRefreshToken}
                    disabled={refreshing}
                    className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#18435f] transition hover:bg-[#f6fbff] disabled:opacity-60"
                  >
                    Refresh Token
                  </button>
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    disabled={refreshing}
                    className="inline-flex rounded-full border border-[#e7c0b7] bg-[#fff5f2] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#8f2c21] transition hover:bg-[#ffece6] disabled:opacity-60"
                  >
                    Disconnect TikTok
                  </button>
                </>
              ) : (
                <a
                  href="/api/auth/tiktok/start"
                  className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white"
                >
                  Connect TikTok
                </a>
              )
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] bg-[#f8fcff] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0f699b]">
              Connection
            </p>
            {configured ? (
              connection ? (
                <div className="mt-4 space-y-2 text-sm text-[#4a6a82]">
                  <p className="font-bold text-[#0c3553]">
                    {connection.displayName || connection.platformAccountLabel || connection.openId}
                  </p>
                  <p>Open ID: {connection.openId}</p>
                  <p>Scopes: {connection.scopes.join(", ")}</p>
                  <p>Access token expires: {formatDate(connection.accessTokenExpiresAt)}</p>
                  <p>OAuth callback: {callbackUrl}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-7 text-[#587286]">
                  TikTok is configured, but no account is connected yet. Connect an authorized account before sending listing videos to TikTok as drafts.
                </p>
              )
            ) : (
              <p className="mt-4 text-sm leading-7 text-[#587286]">
                Add your TikTok client key, client secret, redirect URI, and token encryption secret in the environment before enabling this workflow.
              </p>
            )}
          </div>

          <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#fffdf8_0%,#f4efe1_100%)] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0f699b]">
              Selected property
            </p>
            <p className="mt-4 text-xl font-black text-[#0c3553]">{listingTitle}</p>
            <p className="mt-2 text-sm leading-7 text-[#587286]">
              Upload a local MP4 for this listing or reuse a previously stored video to create a TikTok draft.
            </p>
          </div>
        </div>

        {feedback ? (
          <div className="mt-5 rounded-[1.25rem] border border-[#bad2df] bg-[#edf8ff] px-4 py-3 text-sm font-semibold text-[#0f699b]">
            {feedback}
          </div>
        ) : null}

        {publishState ? (
          <div className="mt-5 rounded-[1.5rem] border border-[#d8e5ee] bg-[#f8fcff] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0f699b]">
                  Latest TikTok status
                </p>
                <p className="mt-2 text-lg font-black text-[#0c3553]">{publishState.status}</p>
                <p className="mt-2 text-sm leading-7 text-[#587286]">{publishState.message}</p>
              </div>
              <button
                type="button"
                onClick={() => handleStatusCheck(publishState.publishId)}
                disabled={refreshing}
                className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#18435f] disabled:opacity-60"
              >
                Check Draft Status
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-[1.75rem] border border-[#d8e5ee] bg-white px-6 py-5 shadow-[0_18px_40px_rgba(7,41,66,0.08)]">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
          Upload a new video
        </p>
        <form className="mt-5 space-y-4" onSubmit={handleUploadSubmit}>
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            className="block w-full rounded-[1rem] border border-[#d8e5ee] bg-[#f8fcff] px-4 py-4 text-sm text-[#18435f]"
          />
          <button
            type="submit"
            disabled={!configured || !connection || isBusy}
            className="inline-flex rounded-full bg-[linear-gradient(180deg,#ff9f2d_0%,#eb7109_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white disabled:opacity-60"
          >
            {isBusy ? "Uploading..." : "Upload Draft to TikTok"}
          </button>
        </form>
      </div>

      <div className="rounded-[1.75rem] border border-[#d8e5ee] bg-white px-6 py-5 shadow-[0_18px_40px_rgba(7,41,66,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0f699b]">
              Stored videos
            </p>
            <h4 className="display-font mt-2 text-[1.8rem] leading-none text-[#0c3553]">
              Video assets for this listing
            </h4>
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="mt-5 rounded-[1.25rem] border border-dashed border-[#bad2df] bg-[#f8fcff] px-4 py-5 text-sm leading-7 text-[#587286]">
            No videos are stored for this listing yet. Upload a local MP4 above to create the first reusable asset.
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {videos.map((video) => {
              const latestJob = jobMap.get(video.id);
              return (
                <article
                  key={video.id}
                  className="rounded-[1.35rem] border border-[#dbe8ef] bg-[#fbfdff] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-extrabold text-[#0c3553]">{video.file_name}</p>
                      <p className="mt-2 text-sm text-[#587286]">
                        {formatFileSize(video.size_bytes)} · {video.mime_type} · Added {formatDate(video.created_at)}
                      </p>
                      {latestJob ? (
                        <p className="mt-2 text-sm font-semibold text-[#0f699b]">
                          Latest draft status: {latestJob.status}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={video.video_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#18435f]"
                      >
                        Preview
                      </a>
                      <button
                        type="button"
                        onClick={() => handleReuseVideo(video.id)}
                        disabled={!configured || !connection || isBusy}
                        className="inline-flex rounded-full bg-[#0d5f90] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white disabled:opacity-60"
                      >
                        Upload Draft
                      </button>
                      {latestJob ? (
                        <button
                          type="button"
                          onClick={() => handleStatusCheck(latestJob.publish_id)}
                          disabled={refreshing}
                          className="inline-flex rounded-full border border-[#c7d7e3] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#18435f] disabled:opacity-60"
                        >
                          Check Status
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
