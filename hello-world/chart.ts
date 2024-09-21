/// <reference types="@kubernetix/types" />

import MyIngress, { MyIngressProps } from "./components/ingress";
import Deployment, { MyDeploymentProps } from "./components/deployment";
import Service, { MyServiceProps } from "./components/service";

const values: { namespace: string, ingress: MyIngressProps } = {
  namespace: k8x.$env["NAMESPACE"] ?? "default",
  ingress: {
    name: k8x.$env["INGRESS_NAME"] ?? "my-ingress",
    appRoot: k8x.$env["INGRESS_APP_ROOT"] ?? "/var/www/html",
    additionalPaths:
      Object.keys(k8x.$env)
        .filter((key) => key.startsWith("INGRESS_PATH"))
        .map((key) => k8x.$env[key]) ?? [],
  },
};

export default (): k8x.Chart => ({
  name: "default",
  namespace: values.namespace,
  components: [
    MyIngress(values.ingress),
    Deployment({ name: "my-deployment" }),
    Service({name: "my-service"})
  ],
});
