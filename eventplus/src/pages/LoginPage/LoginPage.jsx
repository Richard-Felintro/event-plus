import { useNavigate } from "react-router-dom";
import { React, useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import loginImage from "../../assets/images/login.svg";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import Notification from "../../components/Notification/Notification";
import api from "../../Services/Service";

import "./LoginPage.css";
import { UserTokenDecoder, UserContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [notifyUser, setNotifyUser] = useState({});
  const [user, setUser] = useState({
    email: "",
    senha: "",
  });

  useEffect(() => {
    if (userData.name) {
      navigate("/");
    }
  }, [userData]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (user.email.length <= 3 || user.senha.length <= 3) {
      return;
    }

    try {
      const promise = await api.post("/Login", {
        email: user.email,
        senha: user.senha,
      });
      const userFullToken = UserTokenDecoder(promise.data.token);
      setUserData(userFullToken); // Guarda os dados decodificados (payload)
      console.log(userFullToken)
      localStorage.setItem("token", JSON.stringify(userFullToken));
      navigate("/");

    } catch (error) {}
  }

  return (
    <div className="layout-grid-login">
      <div className="login">
        <div className="login__illustration">
          <div className="login__illustration-rotate" />
          <ImageIllustrator
            imageRender={loginImage}
            altText="Imagem de um homem em frente de uma porta de entrada"
            additionalClass={"login-illustrator "}
          />
        </div>

        <div className="frm-login">
          <img src={logo} className="frm-login__logo" alt="" />

          <form className="frm-login__formbox" onSubmit={handleSubmit}>
            <Input
              additionalClass="frm-login__entry"
              type="email"
              id="login"
              name="login"
              required={true}
              value={user.email}
              manipulationFunction={(e) => {
                setUser({
                  //restOperator
                  ...user,
                  email: e.target.value.trim(),
                });
              }}
              placeholder="Email"
            />
            <Input
              additionalClass="frm-login__entry"
              type="password"
              id="senha"
              name="senha"
              required={true}
              value={user.senha}
              manipulationFunction={(e) => {
                setUser({
                  //restOperator
                  ...user,
                  senha: e.target.value.trim(),
                });
              }}
              placeholder="****"
            />

            <a href="https://www.kabum.com.br/" className="frm-login__link">
              Esqueceu a senha?
            </a>

            <Button
              textButton="Login"
              id="btn-login"
              name="btn-login"
              type="submit"
              additionalClass="frm-login__button"
            />
          </form>
        </div>
      </div>

      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
    </div>
  );
};

export default LoginPage;
