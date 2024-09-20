/// <reference types="@kubernetix/types" />

import MyIngress, { MyIngressProps } from "./components/ingress";

const values: { ingress: MyIngressProps } = {
  ingress: {
    name: k8x.$env["INGRESS_NAME"] ?? "my-ingress",
    appRoot: k8x.$env["INGRESS_NAME"] ?? "/var/www/html",
    additionalPaths:
      Object.keys(k8x.$env)
        .filter((key) => key.startsWith("INGRESS_PATH"))
        .map((key) => k8x.$env[key]) ?? [],
  },
};

export default (): k8x.Chart => ({
  name: "default",
  namespace: "default",
  components: [MyIngress(values.ingress)],
});
