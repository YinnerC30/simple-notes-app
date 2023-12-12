import React, { useEffect, useState } from "react";
import { BarraNavegacion } from "../components/BarraNavegacion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createEtiqueta } from "../services/createEtiqueta";
import { actualizarEtiqueta, getEtiqueta } from "../services";


export const InformacionEtiqueta = () => {
  const { id } = useParams();

  const [actualizacion, setActualizacion] = useState(true);

  const [nombre, setNombre] = useState(""); // Estado para almacenar el valor del nombre del formulario
  const navigate = useNavigate();
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const fetchEtiqueta = async () => {
    const nota = await getEtiqueta(id);
    setNombre(nota.nombre);
  };

  useEffect(() => {
    // Llamado a fetchEtiquetas cuando actualizacion es true
    if (actualizacion) {
      fetchEtiqueta();
      setActualizacion(false); // Resetear el estado de actualizacion
    }
  }, [actualizacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarEtiqueta(id, nombre);
      navigate("../etiquetas/lista");
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="contenedor-formulario--etiqueta-botones">
      <form className="formulario-etiqueta" onSubmit={handleSubmit}>
        <fieldset className="elemento-formulario">
          <label htmlFor="nombre" className="label-formulario">
            Nombre:
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={handleNombreChange}
          />
        </fieldset>

        <div className="botones-formulario">
          <input
            type="submit"
            className="boton boton-guardar"
            value="Actualizar"
          />
          <Link className="boton boton-cancelar" to="../etiquetas/lista">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};
