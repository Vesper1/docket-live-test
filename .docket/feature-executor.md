# Feature executor

The local Docket UI dispatches `.github/workflows/docket-feature.yml`.
The existing validate/deploy workflows are retained for their original PR flow.

Repository variables pin the executor and trusted configuration:

- `DOCKET_ENGINE_REPOSITORY`: `Vesper1/docket`
- `DOCKET_ENGINE_SHA`: `0ef56cbd1afe2688956dab9b169fe75045159376`
- `DOCKET_CONFIG_SHA`: the commit installing this file and `deployment.yml`
- `DOCKET_BASELINE_SHA`: that same setup commit for the initial state
- `DOCKET_ENVIRONMENT`: `qa`

The initial baseline reuses the source represented by the last successful QA
deployment, [run 32156357299](https://github.com/Vesper1/docket-live-test/actions/runs/32156357299),
Salesforce deployment `0AfQy00000cCfJGKA0`, org `00DQy00000x2wIrMAI`.
Its source commit `709ed6a5b93c2cc012be6d58b49d4a9c09801a81` and the pre-setup
`main` commit `b22c85d88fdf42b9deac123d54285c56221ada6a` have identical Git trees.
The setup adds only executor/configuration documentation and leaves the
Salesforce source unchanged. This reuses recorded deployment evidence; it is
not a new live org drift check.

Plan packages Git metadata and records the result on `docket-state-v1` without
Salesforce authentication. Other operations use the existing `qa` Environment
and its protection rules and secret. No credential is stored in this config.
