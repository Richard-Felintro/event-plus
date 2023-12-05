import React, { useContext } from "react";
import "./PerfilUsuario.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import iconeLogout from "../../assets/images/icone-logout.svg";
import { UserContext } from "../../context/AuthContext";

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setUserData({});
    Navigate("/");
  }

  return (
    <div className="perfil-usuario">
      {userData.nome ? (
        <>
          <span className="perfil-usuario__menuitem">{userData.nome}</span>
          <span className="perfil-usuario__menuitem"></span>

          <img
            title="Deslogar"
            className="perfil-usuario__icon"
            src={iconeLogout}
            alt="Imagem ilustrativa de uma porta de saída do usuário"
            onClick={logout}
          />
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="perfil-usuario__menuitem perfil-usuario__login-link"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default PerfilUsuario;
