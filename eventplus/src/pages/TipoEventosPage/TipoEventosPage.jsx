import React, { useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";

import eventTypeImage from "../../assets/images/tipo-evento.svg";
import Container from "../../components/Container/Container";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import TableTp from "../../components/TableTp/TableTp";
import api from "../../Services/Service";

const TipoEventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  
  const [titulo, setTitulo] = useState("");

  const [tipoEventos, setTipoEventos] = useState([
    {IdTipoEvento: "123", titulo: "Teste"},
    {IdTipoEvento: "456", titulo: "Texto"},
    {IdTipoEvento: "789", titulo: "Terpe"},
  ]);

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
      console.log("CADASTRADO COM SUCESSO");
      console.log(retorno.data);
      setTitulo(""); //limpa a variável
    } catch (error) {
      console.log("Deu ruim na api:");
      console.log(error);
    }
  }

  function handleDelete() {
    alert("É o Delete daqueles");
  }

  function handleUpdate() {
    alert("Bora Atualizar");
  }

  function showUpdateForm() {
    alert("Update de cria");
  }

  function editActionAbort() {
    alert("Cancelar a edição de dados");
  }

  return (
    <MainContent>
      {/*Cadastro de tipos de evento*/}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página Tipos de Eventos"} />
            <ImageIllustrator
              alterText={"??????"}
              imageRender={eventTypeImage}
            />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  {/* Cadastrar */}
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
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                <p>Tela de Edição</p>
              )}

              {/*  */}
            </form>
          </div>
        </Container>
      </section>

      {/*Cadastro de tipos de evento*/}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Tipo de Eventos"} color="white" />
          <TableTp>
            dados = {tipoEventos}
            fnUpdate = {showUpdateForm}
            FnDelete = {handleDelete}
          </TableTp>
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
