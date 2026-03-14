#!/usr/bin/env python3

import json
import subprocess
from pathlib import Path

OWNER = "avirtualassistant505"
REPO = "nicaraguan-homes-for-rent"
BRANCH = "main"
COMMIT_MESSAGE = "Build Supabase-powered listings admin"
FILES = [
    "package.json",
    "next.config.ts",
    "README.md",
    ".env.example",
    "src/app/page.tsx",
    "src/app/admin/actions.ts",
    "src/app/admin/login/page.tsx",
    "src/app/admin/page.tsx",
    "src/app/listings/page.tsx",
    "src/app/listings/[slug]/page.tsx",
    "src/components/admin/AdminListingForm.tsx",
    "src/components/home/ListingCard.tsx",
    "src/components/home/SearchBar.tsx",
    "src/lib/admin-auth.ts",
    "src/lib/listings.ts",
    "src/lib/supabase/server.ts",
    "supabase/migrations/20260314143000_initial_listings.sql",
    "supabase/migrations/20260314173500_expand_listing_fields.sql",
    "scripts/run-psql.mjs",
    "scripts/github_commit.py",
]


def gh_json(args, payload=None):
    cmd = ["gh", "api"] + args
    if payload is None:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
    else:
        result = subprocess.run(
            cmd + ["--input", "-"],
            input=json.dumps(payload),
            check=True,
            capture_output=True,
            text=True,
        )
    return json.loads(result.stdout)


def main():
    repo_root = Path(__file__).resolve().parents[1]
    branch_data = gh_json([f"repos/{OWNER}/{REPO}/branches/{BRANCH}"])
    parent_commit_sha = branch_data["commit"]["sha"]
    commit_data = gh_json([f"repos/{OWNER}/{REPO}/git/commits/{parent_commit_sha}"])
    base_tree_sha = commit_data["tree"]["sha"]

    tree = []
    for rel_path in FILES:
        content = (repo_root / rel_path).read_text()
        tree.append(
            {
                "path": rel_path,
                "mode": "100644",
                "type": "blob",
                "content": content,
            }
        )

    new_tree = gh_json(
        ["-X", "POST", f"repos/{OWNER}/{REPO}/git/trees"],
        {"base_tree": base_tree_sha, "tree": tree},
    )
    new_commit = gh_json(
        ["-X", "POST", f"repos/{OWNER}/{REPO}/git/commits"],
        {
            "message": COMMIT_MESSAGE,
            "tree": new_tree["sha"],
            "parents": [parent_commit_sha],
        },
    )
    updated_ref = gh_json(
        ["-X", "PATCH", f"repos/{OWNER}/{REPO}/git/refs/heads/{BRANCH}"],
        {"sha": new_commit["sha"], "force": False},
    )

    print(
        json.dumps(
            {
                "commit_sha": new_commit["sha"],
                "ref": updated_ref["ref"],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
