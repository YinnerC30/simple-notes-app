import React from "react";

export const OptionEtiqueta = ({ id_etiqueta, nombre, selected }) => {
  return (
    <option value={id_etiqueta} selected={selected}>
      {nombre}
    </option>
  );
};
