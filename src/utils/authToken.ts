import axios from "axios";
import jwt_decode from 'jwt-decode';

export const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export  const checkTokenExpired = (token: string) => {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    // @ts-ignore
    if (decoded.exp < currentTime) {
        localStorage.removeItem('jwtToken');
        setAuthToken("");
        window.location.href = "/login";
    }
}
