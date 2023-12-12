import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Etiqueta } from "../components/Etiqueta";

export const EtiquetasPage = () => {
  const etiquetasChecked = useRef([]);

  const [etiquetas, setEtiquetas] = useState([]);
  const [actualizacion, setActualizacion] = useState(true);

  const fetchEtiquetas = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/etiquetas");
      if (response.ok) {
        // La solicitud fue exitosa
        const { content } = await response.json();
        setEtiquetas(content);
        console.log("Se llamó a la API");
      } else {
        // La solicitud falló
        console.error("Error: " + response.status);
      }
    } catch (error) {
      console.error("Error al obtener etiquetas:", error);
    }
  };

  useEffect(() => {
    // Llamado a fetchEtiquetas cuando actualizacion es true
    if (actualizacion) {
      fetchEtiquetas();
      setActualizacion(false); // Resetear el estado de actualizacion después de la llamada
    }
  }, [actualizacion]);

  const deleteEtiqueta = async (id_etiqueta) => {
    const url = `http://localhost:8080/api/etiquetas/${id_etiqueta}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (response.ok) {
        // La solicitud se realizó correctamente
        console.log(
          `La etiqueta con id ${id_etiqueta} se eliminó correctamente`
        );
      } else {
        // La solicitud falló
        console.error("No se pudo eliminar la etiqueta");
      }
    } catch (error) {
      // Se produjo un error
      console.error("Error al eliminar etiqueta:", error);
    }
  };

  const handleEliminarEtiqueta = async () => {
    // Obtenemos los input checkbox del componente
    const inputs = document.querySelectorAll(".item-etiqueta .substituted");

    // Recorremos los input checkbox
    etiquetasChecked.current = [];
    for (const input of inputs) {
      // Si el input está checked, lo añadimos a la lista
      if (input.checked) {
        etiquetasChecked.current.push(input.id);
      }
    }

    for (const id_etiqueta of etiquetasChecked.current) {
      await deleteEtiqueta(id_etiqueta);
    }

    setActualizacion(true);
  };

  const estadoCheckboxes = (is_checked) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = is_checked;
    });
  };

  const hayEtiquetas = () =>
    etiquetas.length == 0 ? "No hay etiquetas, debes crear una" : "";

  return (
    <div className="contenedor-etiquetas-botones">
      <div className="grupo-etiquetas">
        {<h3 className="mensaje-no-hay-registros">{hayEtiquetas()}</h3>}

        {etiquetas.map((etiqueta) => (
          <Etiqueta
            id_etiqueta={etiqueta.id_etiqueta}
            nombre={etiqueta.nombre}
            key={etiqueta.id_etiqueta}
          />
        ))}
      </div>

      <div className="grupo-botones">
        <Link className="boton boton-crear" to="/etiquetas/crear">
          Crear
        </Link>
        <button
          className="boton boton-eliminar"
          onClick={handleEliminarEtiqueta}
        >
          Eliminar
        </button>
        <button
          className="boton boton-marcar-todo"
          onClick={() => estadoCheckboxes(true)}
        >
          Marcar todo
        </button>
        <button
          className="boton boton-desmarcar-todo"
          onClick={() => estadoCheckboxes(false)}
        >
          Desmarcar todo
        </button>
      </div>
    </div>
  );
};
