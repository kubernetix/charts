/// <reference types="@kubernetix/types" />

import MyIngressClass, {
  MyIngressClassProps,
} from "./components/ingress-class";
import Deployment, { MyDeploymentProps } from "./components/deployment";
import Service, { MyServiceProps } from "./components/service";
import IngressClass from "./components/ingress-class";

type Values = {
  ingressClass: MyIngressClassProps;
  test: string[]
};

const values: Values = {
  ingressClass: {
    name: $env.get<string>("INGRESS_CLASS_NAME"),
    labels: $env.getAsObject("INGRESS_CLASS_NAME"),
    controller: $env["INGRESS_CLASS_NAME"],
  },
  test: $env.getAsList<string>("INGRESS_TEST")
};

export default (): k8x.Chart => ({
  components: [IngressClass(values.ingressClass)],
});
