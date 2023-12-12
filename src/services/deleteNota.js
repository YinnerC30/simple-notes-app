export const deleteNota = async (id_nota) => {
  const url = `http://localhost:8080/api/notas/eliminar/${id_nota}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`La nota con id ${id_nota} se eliminó correctamente`);
    } else {
      console.error("No se pudo eliminar la nota");
    }
  } catch (error) {
    console.error("Error al eliminar nota:", error);
  }
};
