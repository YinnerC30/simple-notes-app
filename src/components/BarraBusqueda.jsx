import React from 'react'

export const BarraBusqueda = () => {
  return (
    <form className="barra-busqueda">
      <input
        className="entrada-busqueda"
        type="text"
        placeholder="Ingresa el titulo de la nota..."
      />
      <input type="submit" className="boton boton-buscar" value="Buscar" />
    </form>
  );
}
