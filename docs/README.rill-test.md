# Local Rill Test Environment

Runs Rill Developer against the OpenRTB sample project, the local OpenCode LLM
proxy, and HomeBI's ERP321 database.

## Prerequisites

- Docker Desktop is running.
- HomeBI ERP321 is running and has created the `home-bi-local-erp` Docker
  network.
- OpenCode is running with `opencode-llm-proxy` on port `4010`.
- `OPENCODE_LLM_PROXY_TOKEN` is set in the shell.

The Compose file reads the ERP321 reader password from HomeBI's untracked local
environment file. No credentials are stored in this repository.

## Start

From this directory, run:

```powershell
docker compose --env-file "..\HomeBI\.env.erp321-local" -f docker-compose.rill-test.yml up -d --build
```

Open <http://localhost:9009>. The ERP dashboard is named **ERP321 Commerce
Flow**.

To change the UI language, open the avatar menu and select **Language**.

## Services and Data

- Rill runs as `rill-test` and is attached to HomeBI's existing ERP network.
- The OpenCode proxy is reached at `http://host.docker.internal:4010/v1`.
- The proxy model is configured in
  `web-common/tests/projects/openrtb/connectors/opencode.yaml`.
- ERP321 uses the dedicated `erp321_rill_reader`, which has database-enforced
  read-only access to the governed `mart` schema, the required shop dimension,
  and an isolated connection limit.
- `erp321_commerce_flow` materializes the governed `mart.commerce_flow` table.
  The mart excludes cost, margin, and PII fields.

## Stop and Troubleshoot

```powershell
docker compose -f docker-compose.rill-test.yml logs -f rill
docker compose -f docker-compose.rill-test.yml down
```

To query the materialized ERP model directly:

```powershell
docker exec rill-test rill query --local --sql "SELECT count(*) FROM erp321_commerce_flow"
```
