import axios from "axios";

export default function AxiosInstance() {
  let ChatbotAgent = axios.create({
    baseURL: "http://127.0.0.1:5000/",
    headers: {},
  });

  return { ChatbotAgent };
}
