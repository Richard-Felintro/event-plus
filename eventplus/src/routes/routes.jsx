import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventosPage from "../pages/EventosPage/EventosPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TipoEventosPage from "../pages/TipoEventosPage/TipoEventosPage";
import TestePage from "../pages/TestePage/TestePage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { PrivateRoute } from './PrivateRoutes';
import EventosAlunoPage from '../pages/EventosAlunoPage/EventosAlunoPage';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<EventosPage />} path="/eventos" />

        <Route
          element={
            <PrivateRoute redirectTo="/">
              <EventosAlunoPage />
            </PrivateRoute>
          }
          path="/eventos-aluno"
        />

        <Route
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventosPage />
            </PrivateRoute>
          }
          path="/tipo-eventos"
        />
        <Route element={<TestePage />} path="/teste" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
