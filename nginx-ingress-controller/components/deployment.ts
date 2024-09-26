export type MyDeploymentProps = {
  name: string;
};

export default (props: MyDeploymentProps): k8x.Deployment => ({
  apiVersion: "apps/v1",
  kind: "Deployment",
  spec: {
    selector: { matchLabels: { app: "my-app" } },
    template: {
      metadata: { name: "my-app", labels: { app: "my-app" } },
      spec: {
        containers: [
          {
            image: "nginx:latest",
            name: "my-app",
            ports: [{ containerPort: 80, protocol: "TCP" }],
          },
        ],
      },
    },
  },
  metadata: {
    name: props.name,
  },
});
