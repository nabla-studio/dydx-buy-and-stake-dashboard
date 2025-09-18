# dYdX Buy & Stake Dashboard

Interactive dashboard to track dYdX token buying, staking, fees, and growth metrics. Built with Next.js, React, Tailwind CSS, TanStack Query/Table, and SST for static site deployment to AWS with CloudFront CDN.

## Quick start

- **Requirements**:
  - Node.js 20+
  - *pnpm* (or *Bun* optional)
  - AWS account (to deploy with SST)

- **Install**
  - With npm: `pnpm install`
  - Or with Bun: `bun install`

- **Env file**
  - Create an env file. Since an example is provided at `/.env.example`, you can simply `cp .env.example .env`.
  - Update the values for the env variables. 

- **Develop**
  - With pnpm: `pnpm dev`
  - Or with Bun: `bun run dev`
  - App runs (as default) on `http://localhost:3000`

- **Build**
  - With pnpm: `pnpm build`
  - Or with Bun: `bun run build`
  - Output directory: `dist/` (also configured for SST StaticSite)

## Environment variables

The app and deployment use the following variables:

- Runtime/public
  - `NEXT_PUBLIC_API_URL`: base URL for the data API consumed by the dashboard (also set in CI for prod) - currently provided by [numia](https://www.numia.xyz/). It is used to gather the data.
  - `NEXT_PUBLIC_DASHBOARD_URL`: automatically injected at deploy when using SST to reflect the final dashboard URL when a domain is configured. It is used for the website metadata.

- Deployment-only (SST / CloudFront)
  - `DOMAIN_NAME`: custom domain to attach to the CloudFront distribution (e.g. `dashboard.example.com`).
  - `DOMAIN_CERT_ARN`: ACM certificate ARN for `DOMAIN_NAME` in us-east-1. More info available in [sst docs](https://sst.dev/docs/component/aws/static-site/#domain-cert).

Notes:
- In `sst.config.ts`, `NEXT_PUBLIC_DASHBOARD_URL` is computed from `DOMAIN_NAME` when deploying.
- If no domain is provided, the app still deploys and is available at the CloudFront default domain.

### Deploying with SST

This project uses SST v3 (`sst` npm package) and deploys as a `StaticSite` backed by CloudFront.

Common commands (use pnpm or Bun; examples shown with Bun):

```bash
# Development Preview (non-prod stage)
bunx sst dev

# Deploy a stage (creates/updates CloudFront distribution) 
bunx sst deploy --stage=preview

# Remove a stage's resources (non-prod only, prod is protected)
bunx sst remove --stage=preview
```

Local AWS credentials:
- Configure your AWS credentials via environment (e.g. `AWS_PROFILE`, `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`) or SSO before running SST.
- To attach a custom domain, export `DOMAIN_NAME` and `DOMAIN_CERT_ARN` before `sst deploy`.

`sst.config.ts` highlights:
- Stage protection: `prod` is protected and retained; non-prod stages are removable.
- Build command: `bun run build` (emits `dist/`)
- Static site is fronted by CloudFront; deployment doesn’t wait for CDN propagation.

## CI/CD (GitHub Actions)

Prod deploys are automated via `.github/workflows/sst_prod.yaml`:

- Triggers on push to the `prod` branch.
- Uses Bun and Node 20 to install and build.
- Assumes AWS role via OIDC:
  - `PROD_ROLE_ARN` (set as GitHub secret): IAM role ARN to assume for deployment.
  - `AWS_REGION` (set as GitHub secret): target AWS region.
- Provides deployment env vars:
  - `DOMAIN_NAME`, `DOMAIN_CERT_ARN`, `NEXT_PUBLIC_API_URL` (all set as GitHub secrets).
- Runs: `bunx sst deploy --stage=prod`.

To use this workflow:
1. Create the `PROD_ROLE_ARN` role in AWS with trust policy for GitHub OIDC and permissions to create/update CloudFront, S3, and related resources. More info are available in [AWS documentation](https://aws.amazon.com/it/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/).
2. Add repository secrets: `PROD_ROLE_ARN`, `AWS_REGION`, `DOMAIN_NAME`, `DOMAIN_CERT_ARN`, `NEXT_PUBLIC_API_URL`.
3. Push to the `prod` branch to trigger a deployment.

## Tech stack

- Next.js, React, TypeScript
- Tailwind CSS, Radix UI primitives, Lucide icons, Recharts
- TanStack Query & Table
- Biome for formatting/linting
- SST v3 (StaticSite) on AWS CloudFront

## Linting and type checking

- Lint: `pnpm lint` or `bun run lint`
- Auto-fix: `pnpm lint:fix` or `bun run lint:fix`
- TypeScript is configured via `tsconfig.json` and Next.js; most IDEs will type-check on the fly.

## Local environment tips

- Ensure `NEXT_PUBLIC_API_URL` is set if components expect it at runtime; otherwise mock or guard fetches in development.

## License

This project is licensed under the MIT License. See `LICENSE`.
