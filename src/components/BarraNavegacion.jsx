import React from "react";
import { NavLink } from "react-router-dom";

export const BarraNavegacion = () => {
  return (
    <nav className="grupo-enlaces">
      <NavLink className="enlace" to="/notas/lista">
        Notas
      </NavLink>
      <NavLink className="enlace" to="/etiquetas/lista">
        Etiquetas
      </NavLink>
      <NavLink className="enlace" to="/notas/archivadas">
        Archivados
      </NavLink>
      <NavLink className="enlace" to="/notas/papelera">
        Papelera
      </NavLink>
    </nav>
  );
};
