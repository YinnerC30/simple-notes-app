import { useEffect, useRef, useState } from "react";
import { Nota } from "../components/index";
import { Link, NavLink } from "react-router-dom";
import { getNotas, archivarNota, desactivarNota } from "../services/index";

export const NotasPage = () => {
  const notasChecked = useRef([]);
  const [notas, setNotas] = useState([]);
  const [actualizacion, setActualizacion] = useState(true);

  const fetchNotas = async () => {
    const content = await getNotas();
    setNotas(content);
  };

  useEffect(() => {
    // Llamado a fetchNotas cuando actualizacion es true
    if (actualizacion) {
      fetchNotas();
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
    notasChecked.current = getCheckedNotas();

    // Eliminamos las notas
    for (const id_nota of notasChecked.current) {
      await desactivarNota(id_nota);
    }

    setActualizacion(true); // Marcar para una nueva actualización después de eliminar notas
  };

  const handleArchivarNota = async () => {
    notasChecked.current = getCheckedNotas();

    // Eliminamos las notas
    for (const id_nota of notasChecked.current) {
      await archivarNota(id_nota);
    }

    setActualizacion(true); // Marcar para una nueva actualización después de eliminar notas
  };

  const hayNotas = () => notas.length == 0 ? "No hay notas, debes crear una" : "";

  return (
    <div className="contenedor-notas-botones">
      <div className="grupo-notas">
        {<h3 className="mensaje-no-hay-registros">{hayNotas()}</h3>}

        {notas.map((nota) => (
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
        <NavLink className="boton boton-crear" to="../notas/crear">
          Crear
        </NavLink>
        <button className="boton boton-eliminar" onClick={handleEliminarNota}>
          Papelera
        </button>
        <button className="boton boton-archivar" onClick={handleArchivarNota}>
          Archivar
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
