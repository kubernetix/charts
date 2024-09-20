/// <reference types="@kubernetix/types" />

import MyIngress, {MyIngressProps} from "./components/ingress";

// Values which are configurable
const values: {ingress: MyIngressProps, deployment: MyDeploymentProps } = {
  ingress: {
    name: $env["INGRESS_NAME"] ?? "my-ingress",
    appRoot: $env["INGRESS_NAME"] ?? "/var/www/html",
    additionalPaths:
      Object.keys($env)
        .filter((key) => key.startsWith("ADDITIONAL_INGRESS_PATH"))
        .map((key) => $env[key]) ?? [],
  },
  deployment: {
    name: $env["DEPLOYMENT_NAME"] ?? "my-deployment",
  },
};

export default () => (
  <namespace name="default">
    <MyIngress {...values.ingress} />
  </namespace>
);