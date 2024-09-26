export type MyIngressClassProps = {
  name: string;
  annotations?: Record<string, string>;
  labels: k8x.Tuple;
  controller: string
};

export default (props: MyIngressClassProps): k8x.IngressClass => ({
  apiVersion: "networking.k8s.io/v1",
  kind: "IngressClass",
  spec: {
    controller: props.controller
  },
  metadata: {
    name: props.name,
    namespace: "fault", // will be overriden by top level namespace
    labels: {
      "app.kubernetes.io/component: controller": "controller",
      ...props.labels
    },
    annotations: {
      "ingressclass.kubernetes.io/is-default-class": true,
      ...props.annotations,
    },
  },
});
