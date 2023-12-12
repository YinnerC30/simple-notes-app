export const createNota = async (nota) => {
  const apiUrl = "http://localhost:8080/api/notas";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nota),
  });

  // Manejar la respuesta del servidor
  if (response.ok) {
    // La solicitud fue exitosa, puedes redirigir al usuario a la página de etiquetas u realizar otras acciones
    console.log("Etiqueta creada exitosamente");
  } else {
    // La solicitud falló, maneja el error según sea necesario
    console.error("Error al crear la etiqueta");
  }
};
