import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createNota } from "../services/createNota";
import { getFechaHoraActual } from "../utils/getFechaHoraActual";
import { getEtiquetas, getNota } from "../services";
import { updateNota } from "../services/actualizarNota";
import { OptionEtiqueta } from "./OptionEtiqueta";

export const InformacionNota = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [titulo, setTitulo] = useState(""); // Estado para almacenar el valor del nombre del formulario
  const [fecha_creacion, setFecha_creacion] = useState("");

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState();

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
        fecha_creacion: fecha_creacion,
        titulo: titulo,
        contenido: contenido,
        etiqueta: {
          id_etiqueta: etiquetaSeleccionada,
        },
      };

      console.log(objetoCrear);

      await updateNota(id, objetoCrear);
      navigate("../notas/lista");
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const [etiquetas, setEtiquetas] = useState([]);
  const [actualizacion, setActualizacion] = useState(true);

  const fetchNota = async () => {
    const nota = await getNota(id);
    setFecha_creacion(nota.fecha_creacion);
    setTitulo(nota.titulo);
    setEtiquetaSeleccionada(nota.etiqueta.id_etiqueta);
    setContenido(nota.contenido);
  };

  const fetchEtiquetas = async () => {
    const content = await getEtiquetas();
    setEtiquetas(content);
  };

  useEffect(() => {
    // Llamado a fetchEtiquetas cuando actualizacion es true
    if (actualizacion) {
      fetchNota();
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
            defaultValue={etiquetaSeleccionada}
            value={etiquetaSeleccionada} // Utiliza value para controlar la selección
            onChange={(e) => {
              handleSeleccionarEtiqueta(e.target.value);
            }}
          >
            {etiquetas.map((etiqueta) => (
              <OptionEtiqueta
                id_etiqueta={etiqueta.id_etiqueta}
                nombre={etiqueta.nombre}
                key={etiqueta.id_etiqueta}
                selected={etiqueta.id_etiqueta === etiquetaSeleccionada}
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
            value="Actualizar"
          />
          <Link className="boton boton-cancelar" to="/notas/lista">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};
