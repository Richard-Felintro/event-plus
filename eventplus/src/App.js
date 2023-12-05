import "./App.css";
import Rotas from "./routes/routes";
import { UserContext } from './context/AuthContext';
import { useEffect, useState } from "react";
import logo from './logo.svg';

function App() {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    
  },[])
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
}

export default App;
