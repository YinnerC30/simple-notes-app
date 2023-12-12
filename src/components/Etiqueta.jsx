import React from "react";
import { Link } from "react-router-dom";


export const Etiqueta = ({ id_etiqueta, nombre }) => {
  return (
    <div className="item-etiqueta">
      <div className="checkbox-wrapper-1">
        <input
          id={id_etiqueta}
          className="substituted"
          type="checkbox"
          aria-hidden="true"
        />
        <label htmlFor={id_etiqueta}>{nombre}</label>
      </div>
      <Link className="link-ver-etiqueta-completa" to={`../etiquetas/${id_etiqueta}`}>
        Ver completa
      </Link>
    </div>
  );
};
