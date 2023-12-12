export const actualizarEtiqueta = async (id_etiqueta, nombre) => {
  const apiUrl = `http://localhost:8080/api/etiquetas/${id_etiqueta}`;

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"nombre":nombre}),
  });

  // Manejar la respuesta del servidor
  if (response.ok) {
    // La solicitud fue exitosa, puedes redirigir al usuario a la página de etiquetas u realizar otras acciones
    console.log("Etiqueta actualizada exitosamente");
  } else {
    // La solicitud falló, maneja el error según sea necesario
    console.error("Error al actualizar la etiqueta");
  }
};
