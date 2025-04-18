import axios from "axios";
import { Contants } from "../../constants/Contants";

const instance = axios.create({
    baseURL: Contants.URL_BASE,
});

export default instance;