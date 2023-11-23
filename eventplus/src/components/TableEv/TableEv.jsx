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
        {dados.map((e) => {
          return (
            <tr className="table-data__head-row">
              <td className="table-data__data table-data__data--little">
                {e.nomeEvento}
              </td>
              <td className="table-data__data table-data__data--little">
                {e.descricao}
              </td>
              <td className="table-data__data table-data__data--little">
                {e.tiposEvento.titulo}
              </td>
              <td className="table-data__data table-data__data--little">
                {dateFormatDbToView(e.dataEvento)}
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => {fnUpdate(e.idEvento,e.nomeEvento,e.descricao,e.dataEvento,e.idTipoEvento)}}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={() => {fnDelete(e.idEvento)}}
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
