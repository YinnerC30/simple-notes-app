export const desactivarNota = async (id_nota) => {
  const url = `http://localhost:8080/api/notas/${id_nota}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`La nota con id ${id_nota} se desactivo correctamente`);
    } else {
      console.error("No se pudo desactivar la nota");
    }
  } catch (error) {
    console.error("Error al desactivar nota:", error);
  }
};
