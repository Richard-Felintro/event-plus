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
    { number: "1", text: "Todos os eventos" },
    { number: "2", text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState([]); //código do tipo do Evento escolhido
  const [idEvento, setIdEvento] = useState("");

  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    async function loadEventsType() {
      // Trazer todos os eventos
      // Ou trazer somente os meus eventos
      try {
        const promiseTipo = await api.get("/TiposEvento");
        setTipoEvento(promiseTipo.data);
        if (quaisEventos === "1") {
          const promise = await api.get("/Evento/ListarProximos");
          const promiseEventos = await api.get(`/Presenca/`);
          const dadosMarcados = verificaPresenca(
            promise.data,
            promiseEventos.data
          );
          console.log("1");
          setEventos(promise.data);
        } else {
          const promise = await api.get("/Evento/ListarProximos");
          const promiseEventos = await api.get(`/Presenca/`);
          const dadosMarcados = verificaPresenca(
            promise.data,
            promiseEventos.data
          );
          console.log("1");
          setEventos(promise.data);
          // let arrEventos = [];
          // const promiseEventos = await api.get(
          //   `/Presenca/`,userData.userId
          // );
          // promiseEventos.data.forEach((element) => {
          //   arrEventos.push({
          //     ...element.evento,
          //     situacao: element.situacao,
          //     idPresencaEvento: element.idPresencaEvento,
          //   });
          // });
          // setEventos(arrEventos);
          // console.log(arrEventos);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadEventsType();
  }, []);
  // }, [tipoEvento, userData.userId]);

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

  async function getComment() {
    try {
      const promise = await api.get(
        `ComentariosEvento/BuscarPorIdUsuario?IdUsuario=${userData.nome}&IdEvento=${idEvento}`
      );
      return promise;
    } catch (error) {

    }
  }

  async function postMyComment(idComentary) {
    return "????";
  }

  const showHideModal = async (id) => {
    showModal ? setShowModal(false) : setShowModal(true);
    console.log(id);
    setIdEvento(id);
    console.log(idEvento);
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
            id={"tipoEvento"}
            name={"tipoEvento"}
            required={"required"}
            dados={quaisEventos}
            valor={"text"}
            chave={"number"}
            manipulationFunction={(e) => setQuaisEventos(e.target.value)}
          />
          <Table
            tableType={tipoEvento}
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={showHideModal}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          idEvento={idEvento}
          showHideModal={showHideModal}
          fnGet={getComment}
          fnPost={postMyComment}
          fnDelete={commentRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
