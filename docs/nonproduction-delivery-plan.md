# Development to preview delivery plan

Status: proposed, not an enabled deployment pipeline. This branch must not be deployed or merged until the baseline below is resolved.

## Required flow

1. Work in the existing Codex Cloud environment and canonical repository, using a scoped work branch.
2. Integrate into development only after a clean dependency installation and project checks pass.
3. Deploy development to its verified nonproduction hosting target. Record source commit, artifact checksum, migrations (if any), and test evidence.
4. Run functional and visual QA in development using isolated test data. Do not use real payments or production credentials.
5. Promote the same tested source commit/artifact to preview. Verify preview serves that version and complete smoke tests.
6. Provide the preview URL and version for owner review. Code-only completion is not delivery completion.
7. Production is outside this workflow and requires separate authorization.

## Baseline blockers verified 2026-11-16

- main at 71afa55e6d1b48c42dda02c5b4a8b177223cf4e6 has unresolved conflict markers in package-lock.json.
- main package.json uses Vite, while README describes Next.js.
- firebase.json targets dist. Do not execute deployment until the intended hosting project and domain mapping are verified.
- The branch codex/home-header-hero-footer-fixes at 69eb1c8a6ca0375d46d31e6c1b1194cef9e77f79 has Next.js scripts and a different lockfile. It is a baseline candidate, not yet confirmed as the approved deployed version.
- No development/preview branches, open PRs, or Actions runs were returned by the repository audit.

## Safe next implementation

Compare the approved deployed site to existing branch source; choose the canonical baseline without discarding either implementation. Resolve all merge conflicts and regenerate the lockfile using the chosen package manifest. Validate in a fresh Codex task. Then introduce read-only CI (conflict-marker guard, manifest/lock JSON parsing, npm ci, lint/build and applicable tests). CI must not deploy, use production secrets, or receive write/id-token permissions by default. Pin reviewed action versions. Establish development/preview branch and hosting mappings only after verifying the targets. Do not infer that npm preview or a feature-branch deployment is the user's review environment.

## Delivery record

Each delivery records repository, source SHA, development URL, tests and date, preview URL, deployed SHA, rollback reference, and pending review. No passwords, tokens, or credential values belong here.
