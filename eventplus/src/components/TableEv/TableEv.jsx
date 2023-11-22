import React from "react";
import "./TableEv.css";
import { dateFormatDbToView } from "../../Utils/stringFunctions.js"

import editPen from "../../assets/images/edit-pen.svg";
import trashDelete from "../../assets/images/trash-delete.svg";

const TableEv = ({ dados, fnUpdate = null, fnDelete = null}) => {
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Tipo
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Deletar
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((evento) => {
          return (
            <tr className="table-data__head-row">
              <td className="table-data__data table-data__data--little">
                {evento.nomeEvento}
              </td>
              <td className="table-data__data table-data__data--little">
                {evento.descricao}
              </td>
              <td className="table-data__data table-data__data--little">
                {evento.tiposEvento.titulo}
              </td>
              <td className="table-data__data table-data__data--little">
                {dateFormatDbToView(evento.dataEvento)}
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  //* onClick={() => {}}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={() => {fnDelete(evento.idEvento)}}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableEv;
