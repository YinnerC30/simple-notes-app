export const activarNota = async (id_nota) => {
  const apiUrl = `http://localhost:8080/api/notas/activar/${id_nota}`;

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Manejar la respuesta del servidor
  if (response.ok) {
    // La solicitud fue exitosa, puedes redirigir al usuario a la página de etiquetas u realizar otras acciones
    console.log("Nota activada exitosamente");
  } else {
    // La solicitud falló, maneja el error según sea necesario
    console.error("Error al activar la Nota");
  }
};
