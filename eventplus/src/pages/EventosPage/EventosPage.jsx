import "./EventosPage.css";
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Select,
} from "../../components/FormComponents/FormComponents";

import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

import eventoImage from "../../assets/images/evento.svg";
import TableEv from "../../components/TableEv/TableEv";

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [tipoEvento, setTipoEvento] = useState([]);

  const [idEvento, setIdEvento] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [idTipoEvento, setIdTipoEvento] = useState("");

  const [frmEdit, setFrmEdit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [notifyUser, setNotifyUser] = useState({});

  // Puxa os dados dos eventos na api com um Get sempre que o programa é aberto
  useEffect(() => {
    getDados();
  }, []);

  async function getDados() {
    setShowSpinner(true);
    try {
      const promiseEv = await api.get("/Evento/ListarProximos");
      setEventos(promiseEv.data);
      console.log(promiseEv.data);
      const promiseTp = await api.get("/TiposEvento");
      setTipoEvento(promiseTp.data);
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Renderização falha.`,
        imgIcon: "error",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setShowSpinner(true);
    try {
      if (nome.trim().length < 3 || descricao.trim().length < 3) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Campos de texto devem conter mais que 3 caracteres!`,
          imgIcon: "error",
          imgAlt: "",
          showMessage: true,
        });
        return;
      }
      console.log(nome, descricao, data, idTipoEvento);
      const retorno = await api.post("/Evento", {
        nomeEvento: nome,
        descricao: descricao,
        dataEvento: `${data}T00:00:00.000Z`,
        idTipoEvento: idTipoEvento,
        idInstituicao: "662a7d1c-f8e9-4ce2-96c5-ea18447a4e7b",
      });
      console.log(retorno);
      setNome("");
      setDescricao("");
      setData("");
      setIdTipoEvento("");
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        showMessage: true,
      });
      getDados();
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Cadastro falho.`,
        imgIcon: "error",
        imgAlt: "",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  async function handleDelete(id) {
    setShowSpinner(true);
    try {
      await api.delete(`/Evento/${id}`);
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Deletado com sucesso!`,
        imgIcon: "success",
        imgAlt: "",
        showMessage: true,
      });
      getDados();
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Deletação não sucedida`,
        imgIcon: "error",
        imgAlt: "",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  function showUpdateForm(id, nome, desc, data, idTipoEvento) {
    setShowSpinner(true);
    setFrmEdit(true);
    setIdEvento(id);
    setNome(nome);
    setDescricao(desc);
    setData(data.substr(0, 10));
    setIdTipoEvento(idTipoEvento);
    setShowSpinner(false);
  }

  async function handleUpdate() {
    setShowSpinner(true);
    try {
      await api.put(`/Evento/${idEvento}`, {
        nomeEvento: nome,
        descricao: descricao,
        dataEvento: `${data}T00:00:00.000Z`,
        idTipoEvento: idTipoEvento,
        idInstituicao: "662a7d1c-f8e9-4ce2-96c5-ea18447a4e7b",
      });
      setNome("");
      setDescricao("");
      setData("");
      setIdTipoEvento("");
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Atualizado com sucesso!`,
        imgIcon: "success",
        imgAlt: "",
        showMessage: true,
      });
      getDados();
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Atualização falha.`,
        imgIcon: "error",
        imgAlt: "",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  function editActionAbort() {
    setShowSpinner(true);
    setFrmEdit(false);
    setNome("");
    setDescricao("");
    setData("");
    setIdTipoEvento("");
    setShowSpinner(false);
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      {showSpinner ? <Spinner /> : null}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Cadastro de Evento"} borderColor="#B51D44" />
            <ImageIllustrator
              imageRender={eventoImage}
              alterText={"Homem interagindo com pop-ups em uma tela projetada."}
            />
            {!frmEdit ? (
              <form
                className="f-evento"
                onSubmit={!frmEdit ? handleSubmit : handleUpdate}
              >
                <Input
                  type={"text"}
                  id={"nome"}
                  name={"nome"}
                  value={nome}
                  required={"required"}
                  placeholder={"Nome"}
                  manipulationFunction={(e) => {
                    setNome(e.target.value);
                  }}
                  autoComplete="off"
                />
                <Input
                  type={"text"}
                  id={"descricao"}
                  name={"descricao"}
                  value={descricao}
                  required={"required"}
                  placeholder={"Descrição"}
                  manipulationFunction={(e) => {
                    setDescricao(e.target.value);
                  }}
                  autoComplete="off"
                />
                <Select
                  id={"tipoEvento"}
                  name={"tipoEvento"}
                  required={"required"}
                  dados={tipoEvento}
                  value={idTipoEvento}
                  manipulationFunction={(e) => setIdTipoEvento(e.target.value)}
                />
                <label>{idTipoEvento.value}</label>
                <Input
                  type={"date"}
                  id={"data"}
                  name={"data"}
                  value={data}
                  required={"required"}
                  placeholder={"DD/MM/YYYY"}
                  manipulationFunction={(e) => {
                    setData(e.target.value);
                  }}
                  autoComplete="off"
                />

                <Button
                  textButton={"Cadastrar"}
                  type={"submit"}
                  name={"cadastrar"}
                  id={"cadastrar"}
                />
              </form>
            ) : (
              <form
                className="f-evento"
                onSubmit={!frmEdit ? handleSubmit : handleUpdate}
              >
                <div>
                  {" "}
                  <Input
                    type={"text"}
                    id={"nome"}
                    name={"nome"}
                    value={nome}
                    required={"required"}
                    placeholder={"Nome"}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);
                    }}
                    autoComplete="off"
                  />
                  <Input
                    type={"text"}
                    id={"descricao"}
                    name={"descricao"}
                    value={descricao}
                    required={"required"}
                    placeholder={"Descrição"}
                    manipulationFunction={(e) => {
                      setDescricao(e.target.value);
                    }}
                    autoComplete="off"
                  />
                  <Select
                    id={"tipoEvento"}
                    name={"tipoEvento"}
                    required={"required"}
                    dados={tipoEvento}
                    value={idTipoEvento}
                    manipulationFunction={(e) => setIdTipoEvento(e.target.value)}
                  />
                  <Input
                    type={"date"}
                    id={"data"}
                    name={"data"}
                    value={data}
                    required={"required"}
                    placeholder={"DD/MM/YYYY"}
                    manipulationFunction={(e) => {
                      setData(e.target.value);
                    }}
                    autoComplete="off"
                  />
                </div>
                <div className="buttons-editbox">
                  <Button
                    textButton={"Atualizar"}
                    type={"submit"}
                    name={"atualizar"}
                    id={"atualizar"}
                  />
                  <Button
                    textButton={"Cancelar"}
                    type={"button"}
                    name={"cancelar"}
                    id={"cancelar"}
                    manipulationFunction={() => {
                      editActionAbort();
                    }}
                  />
                </div>
              </form>
            )}
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
            fnUpdate={showUpdateForm}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default EventosPage;
