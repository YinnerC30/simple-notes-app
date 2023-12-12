import React from "react";
import { Link } from "react-router-dom";

export const Nota = ({
  id_nota,
  titulo,
  fecha_creacion,
  puede_ver_nota_completa,
}) => {
  return (
    <div className="item-nota">
      <div className="checkbox-wrapper-1">
        <input
          id={id_nota}
          className="substituted"
          type="checkbox"
          aria-hidden="true"
        />

        <label htmlFor={id_nota}>
          {titulo} | {fecha_creacion}
        </label>
      </div>

      {puede_ver_nota_completa ? (
        <Link className="link-ver-nota-completa" to={`../notas/${id_nota}`}>
          Ver completa
        </Link>
      ) : null}
    </div>
  );
};
