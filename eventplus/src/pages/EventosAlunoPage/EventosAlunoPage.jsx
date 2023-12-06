import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]);
  async function loadEventsType() {
    // Trazer todos os eventos
    // Ou trazer somente os meus eventos

    try {
      if (quaisEventos === "1") {
        const promise = await api.get("/Evento/ListarProximos");
        const promiseEventos = await api.get(
          `/Presenca/`
        );
        const dadosMarcados = verificaPresenca(
          promise.data,
          promiseEventos.data
        );
        setEventos(promise.data);
      } else {
        let arrEventos = [];
        const promiseEventos = await api.get(
          `/Presenca/`,userData.userId
        );
        promiseEventos.data.forEach((element) => {
          arrEventos.push({
            ...element.evento,
            situacao: element.situacao,
            idPresencaEvento: element.idPresencaEvento,
          });
        });
        setEventos(promiseEventos.data);
        console.log(promiseEventos.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      for (let i = 0; i < eventsUser.length; i++) {
        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          arrAllEvents[x].situacao = true;
          break;
        }
      }
    }
    return arrAllEvents;
  };

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  async function loadMyComment(idComentary) {
    return "????";
  }

  async function postMyComment(idComentary) {
    return "????";
  }

  const showHideModal = async () => {
    setShowModal(showModal ? false : true);
  };

  const commentRemove = async () => {

    alert("Remover o comentário");
  };

  async function handleConnect(idEvent, theFunc, idPresencaEvento = null) {
    if (theFunc === "connect") {
      try {
        const promise = api.post("/PresencasEvento", {
          situacao: true,
          IdUsuario: userData.userId,
          IdEvento: idEvent,
        });
        if (promise.status === 201) {
          loadEventsType();
        }
      } catch (error) {
        console.log(error);
      }
      return;
    }
    const promiseDelete = api.delete("/PresencasEvento" + idPresencaEvento);
    if (promiseDelete.status === 204) {
    }
  }
  return (
    <>
      <MainContent>
        <Container>
          <Title titleText={"Eventos"} additionalClass="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            dados={quaisEventos} // aqui o array dos tipos
            mudaOpcao={(e) => myEvents(e.target.value)} // aqui só a variável state
            selectValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            tableType={tipoEvento}
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyComment}
          fnPost={postMyComment}
          fnDelete={commentRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
