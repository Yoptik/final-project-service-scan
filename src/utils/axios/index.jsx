import axios from "axios";

export const API_URL = `https://gateway.scan-interfax.ru/api/v1`;

//создаем базовый экземпляр axios
const instance = axios.create({
    baseURL: API_URL,
    Credentials: true, //отвечает за куки
    responseType: "json",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',        
  } 
});


export default instance;