import React, { useEffect } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  commentText = ":3",
  userId = null,
  idEvento = null,
  showHideModal = false,
  fnGet = null,
  fnPost = null,
  fnDelete = null,
  previousComment = null,
}) => {
  useEffect(() => {
    async function getPreviousComment() {
      previousComment = await fnGet();
      console.log(previousComment.descricao);
    }
    getPreviousComment()
  });
  return (
    <div className="modal">
      <article className="modal__box">
        <h3 className="modal__title">
          {modalTitle}
          <span className="modal__close" onClick={() => showHideModal(true)}>
            x
          </span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={fnDelete}
          />

          <p className="comentary__text">{previousComment}</p>

          <hr className="comentary__separator" />
        </div>

        <Input
          placeholder="Escreva seu comentário..."
          additionalClass="comentary__entry"
          value={commentText}
          manipulationFunction={(e) => {
            commentText(e.target.value);
          }}
        />

        <Button
          textButton="Comentar"
          additionalClass="comentary__button"
          manipulationFunction={(e) => {
            fnPost(commentText, idEvento);
          }}
        />
      </article>
    </div>
  );
};

export default Modal;
