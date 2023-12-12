
 export const getEtiqueta = async (id_etiqueta) => {
  try {
    const response = await fetch(`http://localhost:8080/api/etiquetas/${id_etiqueta}`);
    if (response.ok) {
      const content = await response.json();
      console.log("Se llamó a la API para obtener la etiqueta");
      return content;
    } else {
      console.error("Error: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la etiqueta:", error);
  }
};