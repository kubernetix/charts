export type MyIngressProps = {
  name: string;
  annotations?: Record<string, string>;
  additionalPaths: string[];
  appRoot: string;
};

const defaultBackend: IngressPath["backend"] = {
  service: {
    name: "my-backend",
    port: {
      number: 8080,
    },
  },
};

function generateIngressPaths(additionalPaths: string[] = []): IngressPath[] {
  return [
    { path: "/", backend: defaultBackend, pathType: "ImplementationSpecific" },
    ...additionalPaths.map<IngressPath>((p) => ({
      path: p,
      backend: defaultBackend,
      pathType: "ImplementationSpecific",
    })),
  ];
}

export default (props: MyIngressProps) => (
  <ingress
    apiVersion="networking.k8s.io/v1"
    kind="Ingress"
  >
    <metadata
      name={props.name}
      annotations={{
        "nginx.ingress.kubernetes.io/app-root": props.appRoot,
        "nginx.ingress.kubernetes.io/enable-cors": "true",
        "nginx.ingress.kubernetes.io/cors-allow-origin": "https://example.com",
        ...props.annotations,
      }}
    ></metadata>
  </ingress>
);
