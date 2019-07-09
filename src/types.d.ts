declare module "apollo-storybook-react";
declare module "ipfs-http-client";

// So that when importing png image as URL it gets correctly typed as string:
declare module "*.png" {
  const value: string;
  export = value;
}
