import { Navigate, Route, Routes } from "react-router-dom";
import { NotasPage } from "./NotasPage";
import { EtiquetasPage } from "./EtiquetasPage";
import { ArchivadosPage } from "./ArchivadosPage";
import { PapeleraPage } from "./PapeleraPage";
import { BarraNavegacion } from "../components/BarraNavegacion";
import { BarraBusqueda } from "../components/BarraBusqueda";
import { useEffect } from "react";
import { CrearNotaPage, CrearEtiquetaPage } from "../pages/index";
import { InformacionNota } from "../components";
import { ComponentePrueba } from "../components/ComponentePrueba";
import { InformacionEtiqueta } from "./InformacionEtiqueta";

export const PrincipalPage = () => {
  // Marcar los input check

  /* const marcarTodosLosCheckboxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  }; */

  /* useEffect(() => {
    

    const handleKeyPress = (event) => {
      event.preventDefault();
      // Verifica si la tecla presionada es la 'A' y la tecla CTRL está presionada
      if (event.key === "a" && (event.ctrlKey || event.metaKey)) {
        marcarTodosLosCheckboxes();
      }
    };

    // Agrega el evento de escucha de teclado cuando el componente se monta
    document.addEventListener("keydown", handleKeyPress);

    // Limpia el evento de escucha cuando el componente se desmonta
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); */

  return (
    <>
      <div className="contenedor-app">
        <div className="contenedor">
          <div className="cabezera">
            <h1 className="titulo">Simple Notes App</h1>
            <BarraBusqueda />
            <BarraNavegacion />
          </div>
          <Routes>
            <Route path="/*" element={<NotasPage />} />
            <Route path="notas/lista" element={<NotasPage />} />
            <Route path="notas/crear" element={<CrearNotaPage />} />
            <Route path="notas/:id" element={<InformacionNota />} />
            <Route path="notas/archivadas" element={<ArchivadosPage />} />
            <Route path="notas/papelera" element={<PapeleraPage />} />

            <Route path="etiquetas/lista" element={<EtiquetasPage />} />
            <Route path="etiquetas/crear" element={<CrearEtiquetaPage />} />
            <Route path="etiquetas/:id" element={<InformacionEtiqueta />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
