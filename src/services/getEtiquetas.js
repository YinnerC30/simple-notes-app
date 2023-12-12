export const getEtiquetas = async () => {
  const response = await fetch(
    "http://localhost:8080/api/etiquetas?sort=nombre"
  );
  if (response.ok) {
    // La solicitud fue exitosa
    const { content } = await response.json();
    console.log("Se llamo la api para cargar las etiquetas");
    return content;
  } else {
    // La solicitud falló
    console.log("Error: " + response.status);
  }
};
