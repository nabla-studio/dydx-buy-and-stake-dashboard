// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

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
        command: "npm run build",
        output: "dist"
      },
      // Avoid to wait for the CloudFront distribution to be deployed before 
      // completing the deployment of the app
      transform: {
        cdn: {
          wait: false
        }
      }
    });
  },
});
