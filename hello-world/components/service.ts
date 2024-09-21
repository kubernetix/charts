export type MyServiceProps = {
  name: string;
};

export default (props: MyServiceProps): k8x.Service|null => {
    if(props.name !== "my-service") return null
  
    return {
    apiVersion: "v1",
    kind: "Service",
    spec: {
      selector: { app: "my-app" },
      ports: [{ port: 80, targetPort: 8080 }],
      type: "ClusterIP",
    },
    metadata: {
      name: props.name,
    },
  };
};
