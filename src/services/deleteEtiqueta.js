export const deleteEtiqueta = async (id_etiqueta) => {
  const url = `http://localhost:8080/api/etiquetas/${id_etiqueta}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (response.ok) {
      // La solicitud se realizó correctamente
      console.log(`La etiqueta con id ${id_etiqueta} se eliminó correctamente`);
    } else {
      // La solicitud falló
      console.error("No se pudo eliminar la etiqueta");
    }
  } catch (error) {
    // Se produjo un error
    console.error("Error al eliminar etiqueta:", error);
  }
};
