
 export const getNota = async (id_nota) => {
  try {
    const response = await fetch(`http://localhost:8080/api/notas/${id_nota}`);
    if (response.ok) {
      const content = await response.json();
      console.log("Se llamó a la API para obtener la nota");
      return content;
    } else {
      console.error("Error: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener la nota:", error);
  }
};