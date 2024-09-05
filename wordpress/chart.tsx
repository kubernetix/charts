const replicas = Number(process.env["VARIABLE"]);
const ns = process.env["NAMESPACE"];

export default () => (
  <Kubernetix>
    <Cluster>
      <Namespace>
        <Ingress>
        </Ingress>
      </Namespace>
      <Namespace></Namespace>
      <Namespace></Namespace>
      <Namespace></Namespace>
    </Cluster>
  </Kubernetix>
);
