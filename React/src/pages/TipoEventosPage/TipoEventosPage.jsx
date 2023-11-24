import React, { useEffect, useState } from "react";
import { arrayToAlphabeticalOrder } from "../../Utils/arrayFunctions";

import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../components/Container/Container";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import TableTp from "../../components/TableTp/TableTp";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const TipoEventosPage = () => {
  const [notifyUser, setNotifyUser] = useState({});
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [tipoEventos, setTipoEventos] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(
    () =>
      async function getTipoEventos() {
        setShowSpinner(true);
        try {
          const promise = await api.get("/TiposEvento");
          setTipoEventos(promise.data);
        } catch (error) {
          setNotifyUser({
            titleNote: "Aviso",
            textNote: `API não alcançada`,
            imgIcon: "warning",
            imgAlt: "",
            showMessage: true,
          });
        }
        getTipoEventos();
        setShowSpinner(false);
      },
    []
  );

  async function handleSubmit(e) {
    setShowSpinner(true);
    // parar o submit do formulário
    e.preventDefault();
    // validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `Tipo de evento deve ter 3 caracteres ou mais.`,
        imgIcon: "warning",
        imgAlt: "",
        showMessage: true,
      });
      return;
    }
    // chamar a api
    try {
      const retorno = await api.post("/TiposEvento", { titulo: titulo });

      // Notificação de sucesso
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Mulher segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      setTitulo(""); //limpa a variável
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Cadastro náo sucedido!`,
        imgIcon: "danger",
        imgAlt: "",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  async function handleDelete(id) {
    setShowSpinner(true);
    try {
      await api.delete(`/TiposEvento/${id}`);
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Deletado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Mulher segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Detetação não sucedida!`,
        imgIcon: "danger",
        imgAlt: "",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setShowSpinner(true);
    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `Tipo de evento deve ter 3 caracteres ou mais.`,
        imgIcon: "warning",
        imgAlt: "",
        showMessage: true,
      });
      return;
    }
    // chamar a api
    try {
      if (editId != "")
        await api.put(`/TiposEvento/${editId}`, { titulo: titulo });
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Editado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Mulher segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      setFrmEdit(false);
      setEditId("");
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Edição não sucedida!`,
        imgIcon: "danger",
        imgAlt: "",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  }

  function showUpdateForm(id, titulo) {
    setShowSpinner(true);
    try {
      setTitulo(titulo);
      setEditId(id);
      setFrmEdit(true);
      setEditTitle(titulo);
      setShowSpinner(false);
    } catch (error) {
      console.log(error);
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `Transição para atualizar falhou.`,
        imgIcon: "danger",
        imgAlt: "",
        showMessage: true,
      });
      setShowSpinner(false);
    }
  }

  function editActionAbort() {
    setTitulo("");
    setEditId("");
    setFrmEdit(false);
    setEditTitle("");
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
      {showSpinner ? <Spinner /> : null}
      {/*Cadastro de tipos de evento*/}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página de Tipos de Evento"} />
            <ImageIllustrator alterText={"???"} imageRender={eventTypeImage} />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Título"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />
                  <Button
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton="Cadastrar"
                  />
                </>
              ) : (
                <>
                  <div>
                    <Input
                      type={"text"}
                      id={"titulo"}
                      name={"titulo"}
                      placeholder={"Título"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <label>
                      Editando <strong>{editTitle}</strong>
                    </label>
                  </div>
                  <div className="buttons-editbox">
                    <Button
                      type={"submit"}
                      id={"atualizar"}
                      name={"atualizar"}
                      textButton="Atualizar"
                    />
                    <Button
                      type={"button"}
                      id={"cancelar"}
                      name={"cancelar"}
                      textButton="Cancelar"
                      manipulationFunction={() => {
                        editActionAbort();
                      }}
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      {/*Cadastro de tipos de evento*/}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Tipos de Evento"} color="white" />
          <TableTp
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
