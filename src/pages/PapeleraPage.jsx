import React from "react";
import { useEffect, useRef, useState } from "react";
import { Nota } from "../components";
import { activarNota, deleteNota, getNotasPapelera } from "../services";

export const PapeleraPage = () => {
  const notasChecked = useRef([]);
  const [notasPapelera, setNotasPapelera] = useState([]);
  const [actualizacion, setActualizacion] = useState(true);

  const fetchNotasPapelera = async () => {
    const content = await getNotasPapelera();
    setNotasPapelera(content);
  };

  useEffect(() => {
    // Llamado a fetchNotas cuando actualizacion es true
    if (actualizacion) {
      fetchNotasPapelera();
      setActualizacion(false); // Asegúrate de marcar la actualización como completada después de la llamada
    }
  }, [actualizacion]);

  const getCheckedNotas = () => {
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
    notasChecked.current = getCheckedNotas();

    // Eliminamos las notas
    for (const id_nota of notasChecked.current) {
      await deleteNota(id_nota);
    }

    setActualizacion(true); // Marcar para una nueva actualización después de eliminar notas
  };

  const handleActivarNota = async () => {
    // Actualizamos la lista de notas checked
    notasChecked.current = getCheckedNotas();

    // Eliminamos las notas
    for (const id_nota of notasChecked.current) {
      await activarNota(id_nota);
    }

    setActualizacion(true); // Marcar para una nueva actualización después de eliminar notas
  };

  const hayNotas = () =>
    notasPapelera.length == 0 ? "No hay notas en la papelera" : "";

  return (
    <div className="contenedor-notas-botones">
      <div className="grupo-notas">

        {<h3 className="mensaje-no-hay-registros">{hayNotas()}</h3>}

        {notasPapelera.map((nota) => (
          <Nota
            id_nota={nota.id_nota}
            titulo={nota.titulo}
            fecha_creacion={nota.fecha_creacion}
            key={nota.id_nota}
            puede_ver_nota_completa={false}
          />
        ))}
      </div>

      <div className="grupo-botones">
        <button className="boton boton-restaurar" onClick={handleActivarNota}>
          Restaurar
        </button>
        <button className="boton boton-eliminar" onClick={handleEliminarNota}>
          Eliminar
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
