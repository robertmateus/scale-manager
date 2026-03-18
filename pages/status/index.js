import useSWR from "swr";

async function Status(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}
export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", Status, {
    refreshInterval: 2000,
  });
  let updatedAtStatus = "Carregando...";

  if (!isLoading && data) {
    updatedAtStatus = new Date(data.update_at).toLocaleString("pt-BR");
  }
  return <div>Ultima Atualização: {updatedAtStatus}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", Status, {
    refreshInterval: 2000,
  });

  let InformationDatabase = "Carregando...";

  if (!isLoading && data) {
    InformationDatabase = (
      <>
        <div>Versão: {data.database.version}</div>
        <div>Conecções Máximas: {data.database.max_connections}</div>
        <div>Conecções Abertas: {data.database.opened_connections}</div>
      </>
    );
    return (
      <>
        <h2>Database</h2>
        <div>{InformationDatabase}</div>
      </>
    );
  }
}
