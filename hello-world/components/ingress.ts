export type MyIngressProps = {
  name: string;
  appRoot?: string;
  annotations?: Record<string, string>;
  additionalPaths: string[];
};

const defaultBackend: k8x.IngressPath["backend"] = {
  service: {
    name: "super-duper-service",
    port: {
      number: 8080,
    },
  },
};

function generateIngressPaths(additionalPaths: string[] = []): k8x.IngressPath[] {
  const paths: k8x.IngressPath[] = [
    { path: "/", backend: defaultBackend, pathType: "ImplementationSpecific" },
  ];

  for (const path of additionalPaths) {
    paths.push({
      path: path,
      backend: defaultBackend,
      pathType: "ImplementationSpecific",
    });
  }

  return paths;
}

export default (props: MyIngressProps): k8x.Ingress => ({
  apiVersion: "networking.k8s.io/v1",
  kind: "Ingress",
  spec: {
    rules: [{ host: "pfusch.dev", http: { paths: generateIngressPaths() } }],
  },
  metadata: {
    name: props.name,
    annotations: {
      "nginx.ingress.kubernetes.io/app-root": "/var/www/html",
      "nginx.ingress.kubernetes.io/enable-cors": "true",
      "nginx.ingress.kubernetes.io/cors-allow-origin": "https://example.com",
      ...props.annotations,
    },
  },
});
