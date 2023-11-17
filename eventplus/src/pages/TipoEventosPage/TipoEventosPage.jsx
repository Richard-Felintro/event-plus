import React, { useEffect, useState } from "react";
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

const TipoEventosPage = () => {
  const [notifyUser, setNotifyUser] = useState({});

  const [frmEdit, setFrmEdit] = useState(false);

  const [titulo, setTitulo] = useState("");

  const [editId, setEditId] = useState("");

  const [editTitle, setEditTitle] = useState("");

  const [tipoEventos, setTipoEventos] = useState([]);

  useEffect(
    () =>
      async function getTipoEventos() {
        try {
          const promise = await api.get("/TiposEvento");
          setTipoEventos(
            promise.data.sort((a, b) => {
              if (a.titulo < b.titulo) {
                return -1;
              }
            })
          );
        } catch (error) {}
        getTipoEventos();
      },
    []
  );

  async function handleSubmit(e) {
    // parar o submit do formulário
    e.preventDefault();
    // validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres");
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
    } catch (error) {}
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/TiposEvento/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (titulo.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres");
      return;
    }
    // chamar a api
    try {
      if (editId != "")
        await api.put(`/TiposEvento/${editId}`, { titulo: titulo });
      setFrmEdit(false);
      setEditId("");
    } catch (error) {}
  }

  function showUpdateForm(id, titulo) {
    setTitulo(titulo);
    setEditId(id);
    setFrmEdit(true);
    setEditTitle(titulo);
  }

  function editActionAbort() {
    alert("Cancelar a edição de dados");
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
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
              <div>
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
                </>
                {frmEdit ? (
                  <label>
                    Editando <strong>{editTitle}</strong>
                  </label>
                ) : (
                  <></>
                )}
              </div>
              <Button
                type={"submit"}
                id={"cadastrar"}
                name={"cadastrar"}
                textButton={frmEdit ? "Atualizar" : "Cadastrar"}
              />
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
