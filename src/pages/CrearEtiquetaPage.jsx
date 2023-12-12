import React, { useState } from "react";
import { BarraNavegacion } from "../components/BarraNavegacion";
import { Link, useNavigate } from "react-router-dom";
import { createEtiqueta } from "../services/createEtiqueta";

export const CrearEtiquetaPage = () => {
  const [nombre, setNombre] = useState(""); // Estado para almacenar el valor del nombre del formulario
  const navigate = useNavigate();
  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEtiqueta(nombre);
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
            value="Guardar"
          />
          <Link className="boton boton-cancelar" to="../etiquetas/lista">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};
