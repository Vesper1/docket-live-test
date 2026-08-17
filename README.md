# Docket live test

A minimal Salesforce repository whose only purpose is to run
[Docket](https://github.com/Vesper1/docket) end to end on real GitHub Actions
against a real sandbox — the acceptance the fixture suite cannot give.

```text
force-app/main/default/classes/   two Apex classes: one fixture, one test
docket.yml                        one QA environment, one gate, one test class
.github/workflows/                the Docket templates, unmodified except one step
```

## The one deviation from the templates

The engine is not published to npm yet, so every workflow builds it instead of
installing it:

```bash
git clone https://github.com/Vesper1/docket.git "$RUNNER_TEMP/docket-engine"
git -C "$RUNNER_TEMP/docket-engine" checkout "$DOCKET_ENGINE_REF"
npm install --global "$(npm pack --silent)"
```

`DOCKET_ENGINE_REF` is a repository variable holding one exact commit SHA of
the engine — the same discipline `DOCKET_PACKAGE` enforces, without a registry.
The build happens in `$RUNNER_TEMP`, never in the candidate workspace.

When the engine is published this step becomes one line again:

```bash
npm install --global "$DOCKET_PACKAGE"
```

## Setup

| What | Where | Value |
| --- | --- | --- |
| `DOCKET_ENGINE_REF` | repository variable | full engine commit SHA |
| `DOCKET_SF_AUTH_URL` | secret on the `qa` environment | `force://…` from `sf org display --verbose --json` |
| `qa` | GitHub Environment | required reviewer, so a candidate commit cannot reach the credential |
| `docket/validate` | required status check on `main` | the only thing gating the Merge button |

## What a run proves

1. Open a pull request from `add-apex-class` into `main`.
2. `gates` runs without any credential; `validate` then deploys nothing but
   asks Salesforce to validate the plan and run `DocketFixtureTest`.
3. The `docket/validate` check goes green and Merge unlocks.
4. Merging starts `docket-deploy.yml`, which deploys exactly the validated
   plan — not a freshly built one.
5. `docket-rollback.yml` opens a compensating pull request that goes through
   the same path.
