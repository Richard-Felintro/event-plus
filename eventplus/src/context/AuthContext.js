import { jwtDecode } from 'jwt-decode';
import {createContext} from 'react';

export const UserContext = createContext(null);

export const UserTokenDecoder = (theToken) => {
    const decoded = jwtDecode(theToken); //aqui vem o payload do jwt

    return {
        role: "Aluno",
        nome: decoded.name,
        userId: decoded.jti,
        token: theToken
    }
}