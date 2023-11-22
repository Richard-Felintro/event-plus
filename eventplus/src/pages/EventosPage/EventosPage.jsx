import "./EventosPage.css";
import React, { useEffect, useState } from "react";
import {
  arrayToDateOrder,
  arrayToAlphabeticalOrder,
} from "../../Utils/arrayFunctions";

import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Container from "../../components/Container/Container";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

import eventoImage from "../../assets/images/evento.svg";
import TableEv from "../../components/TableEv/TableEv";

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);

  // Puxa os dados dos eventos na api com um Get sempre que o programa é aberto
  useEffect(() => {
    async function getEventos() {
      try {
        const promise = await api.get("/Evento");
        setEventos(promise.data);
      } catch (error) {
        console.log(error);
      }
    }
    getEventos();
    console.log(eventos);
  }, []);

  async function handleDelete(id) {
    try {
      const retorno = await api.delete(`/Evento/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MainContent>
      {/* <Notification />
      <Spinner /> */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Cadastro de Evento"} borderColor="#B51D44" />
            <ImageIllustrator
              imageRender={eventoImage}
              alterText={"Homem interagindo com pop-ups em uma tela projetada."}
            />
            <form className="f-evento">
              <Input
                type={"text"}
                id={"nome"}
                name={"nome"}
                //* value={value}
                required={"required"}
                placeholder={"Nome"}
                //* onChange={manipulationFunction}
                autoComplete="off"
              />
              <Input
                type={"text"}
                id={"descricao"}
                name={"descricao"}
                //* value={value}
                required={"required"}
                placeholder={"Descrição"}
                //* onChange={manipulationFunction}
                autoComplete="off"
              />
              <Input
                type={"text"}
                id={"tipoEvento"}
                name={"tipoEvento"}
                //* value={value}
                required={"required"}
                placeholder={"TIPO EVENTO PLACEHOLDER"}
                //* onChange={manipulationFunction}
                autoComplete="off"
              />
              <Input
                type={"date"}
                id={"data"}
                name={"data"}
                //* value={value}
                required={"required"}
                placeholder={"DD/MM/YYYY"}
                //* onChange={manipulationFunction}
                autoComplete="off"
              />
              <Button
                type={"submit"}
                name={"cadastrar"}
                id={"cadastrar"}
                manipulationFunction={""}
              />
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-eventos-section">
        <Container>
          <Title
            titleText={"Lista de Eventos"}
            color={"white"}
            borderColor={"white"}
          />
          <TableEv
            dados={eventos}
            fnDelete={handleDelete}
            fnUpdate={"showUpdateForm"}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default EventosPage;
