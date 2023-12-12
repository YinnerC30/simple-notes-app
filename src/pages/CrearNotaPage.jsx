import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNota } from "../services/createNota";
import { getFechaHoraActual } from "../utils/getFechaHoraActual";
import { OptionEtiqueta } from "../components";

export const CrearNotaPage = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState(""); // Estado para almacenar el valor del nombre del formulario

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState(1);

  const handleSeleccionarEtiqueta = (idEtiqueta) => {
    console.log("Se ha seleccionado una etiqueta en el formulario");
    setEtiquetaSeleccionada(idEtiqueta);
  };

  const [contenido, setContenido] = useState(""); // Estado para almacenar el valor del nombre del formulario
  const handleContenidoChange = (e) => {
    setContenido(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Realizar la solicitud POST
    try {
      const objetoCrear = {
        fecha_creacion: getFechaHoraActual(),
        titulo: titulo,
        contenido: contenido,
        etiqueta: {
          id_etiqueta: etiquetaSeleccionada,
        },
      };

      console.log(objetoCrear);

      await createNota(objetoCrear);
      navigate("../notas/lista");
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const [etiquetas, setEtiquetas] = useState([]);
  const [actualizacion, setActualizacion] = useState(true);

  const fetchEtiquetas = async () => {
    const response = await fetch(
      "http://localhost:8080/api/etiquetas?sort=nombre"
    );
    if (response.ok) {
      // La solicitud fue exitosa
      const { content } = await response.json();
      setEtiquetas(content);
      console.log("Se llamo la api para cargar las etiquetas");
    } else {
      // La solicitud falló
      console.log("Error: " + response.status);
    }
  };

  useEffect(() => {
    // Llamado a fetchEtiquetas cuando actualizacion es true
    if (actualizacion) {
      fetchEtiquetas();
      setActualizacion(false); // Resetear el estado de actualizacion
    }
  }, [actualizacion]);

  return (
    <div className="contenedor-formulario--nota-botones">
      <form className="formulario-nota" onSubmit={handleSubmit}>
        <fieldset className="elemento-formulario">
          <label htmlFor="titulo" className="label-formulario">
            Titulo:
          </label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={handleTituloChange}
          />
        </fieldset>

        <fieldset className="elemento-formulario">
          <label htmlFor="etiqueta" className="label-formulario">
            Etiqueta:
          </label>
          <select
            name="etiqueta"
            id="etiqueta"
            onChange={(e) => {
              console.log(e.target);
              handleSeleccionarEtiqueta(e.target.value);
            }}
          >
            {etiquetas.map((etiqueta) => (
              <OptionEtiqueta
                id_etiqueta={etiqueta.id_etiqueta}
                nombre={etiqueta.nombre}
                key={etiqueta.id_etiqueta}
              />
            ))}
          </select>
        </fieldset>

        <fieldset className="elemento-formulario">
          <label htmlFor="contenido" className="label-formulario">
            Contenido:
          </label>
          <textarea
            name=""
            id="contenido"
            cols="30"
            rows="10"
            value={contenido}
            onChange={handleContenidoChange}
          ></textarea>
        </fieldset>

        <div className="botones-formulario">
          <input
            type="submit"
            className="boton boton-guardar"
            value="Guardar"
          />
          <Link className="boton boton-cancelar" to="/notas/lista">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};
