// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

// Extract environment variables
const { DOMAIN_NAME, DOMAIN_CERT_ARN } = process.env;
const { DEV_DOMAIN_NAME } = process.env;

const getDashboardUrl = () => {
  const domain = DOMAIN_NAME || DEV_DOMAIN_NAME;
  return domain ? `https://${domain}/` : "";
};

export default $config({
  app(input) {
    return {
      name: "dydx-buy-and-stake-dashboard",
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["prod"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.StaticSite("Dashboard", {
      // Define building commands
      build: {
        command: "bun run build",
        output: "dist",
      },
      environment: {
        NEXT_PUBLIC_DASHBOARD_URL: getDashboardUrl(),
      },
      transform: {
        cdn: {
          // Avoid to wait for the CloudFront distribution to be deployed before
          // completing the deployment of the app
          wait: false,

          comment: `${$app.stage} dydx dashboard site`,

          // Add custom domain only if provided
          ...(DOMAIN_NAME &&
            DOMAIN_CERT_ARN && {
              domain: {
                name: DOMAIN_NAME,
                dns: false,
                cert: DOMAIN_CERT_ARN,
              },
            }),
        },
      },
    });
  },
});
