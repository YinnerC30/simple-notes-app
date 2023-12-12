import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  getNotasArchivadas,
  desarchivarNota,
  desactivarNota,
} from "../services/index";
import { Nota } from "../components";

export const ArchivadosPage = () => {
  const notasChecked = useRef([]);
  const [notasArchivadas, setNotasArchivadas] = useState([]);
  const [actualizacion, setActualizacion] = useState(true);

  const fetchNotasArchivadas = async () => {
    const content = await getNotasArchivadas();
    setNotasArchivadas(content);
  };

  useEffect(() => {
    // Llamado a fetchNotas cuando actualizacion es true
    if (actualizacion) {
      fetchNotasArchivadas();
      setActualizacion(false); // Asegúrate de marcar la actualización como completada después de la llamada
    }
  }, [actualizacion]);

  const getCheckedNotasArchivadas = () => {
    const inputs = document.querySelectorAll(".item-nota .substituted");
    const checkedInputs = [];
    // Actualizamos la lista de notas checked
    notasChecked.current = [];
    for (const input of inputs) {
      if (input.checked) {
        checkedInputs.push(input.id);
      }
    }
    return checkedInputs;
  };

  const estadoCheckboxes = (is_checked) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = is_checked;
    });
  };

  const handleEliminarNota = async () => {
    // Actualizamos la lista de notas checked
    notasChecked.current = getCheckedNotasArchivadas();

    // Eliminamos las notas
    for (const id_nota of notasChecked.current) {
      await desactivarNota(id_nota);
    }

    setActualizacion(true); // Marcar para una nueva actualización después de eliminar notas
  };

  const handleDesarchivarNota = async () => {
    // Actualizamos la lista de notas checked
    notasChecked.current = getCheckedNotasArchivadas();

    // Eliminamos las notas
    for (const id_nota of notasChecked.current) {
      await desarchivarNota(id_nota);
    }

    setActualizacion(true); // Marcar para una nueva actualización después de eliminar notas
  };

  const hayNotas = () =>
    notasArchivadas.length == 0 ? "No hay notas archivadas" : "";

  return (
    <div className="contenedor-notas-botones">
      <div className="grupo-notas">
        {<h3 className="mensaje-no-hay-registros">{hayNotas()}</h3>}

        {notasArchivadas.map((nota) => (
          <Nota
            id_nota={nota.id_nota}
            titulo={nota.titulo}
            fecha_creacion={nota.fecha_creacion}
            key={nota.id_nota}
            puede_ver_nota_completa={true}
          />
        ))}
      </div>

      <div className="grupo-botones">
        <button
          className="boton boton-desarchivar"
          onClick={handleDesarchivarNota}
        >
          Desarchivar
        </button>
        <button className="boton boton-eliminar" onClick={handleEliminarNota}>
          Papelera
        </button>
        <button
          className="boton boton-marcar-todo"
          onClick={() => estadoCheckboxes(true)}
        >
          Marcar todo
        </button>
        <button
          className="boton boton-desmarcar-todo"
          onClick={() => estadoCheckboxes(false)}
        >
          Desmarcar todo
        </button>
      </div>
    </div>
  );
};
