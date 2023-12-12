export const createEtiqueta = async (etiqueta) => {
  const response = await fetch("http://localhost:8080/api/etiquetas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: etiqueta }), // Enviar el nombre como JSON en el cuerpo de la solicitud
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
