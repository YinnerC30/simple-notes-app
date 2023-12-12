export const getNotas = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/notas?sort=id_nota");
    if (response.ok) {
      const { content } = await response.json();
      console.log("Se llamó a la API para obtener las notas");
      return content;
    } else {
      console.error("Error: " + response.status);
    }
  } catch (error) {
    console.error("Error al obtener notas:", error);
  }
};
