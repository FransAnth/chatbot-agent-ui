import AxiosInstance from "../helpers/axios-instances";

const { ChatbotAgent } = AxiosInstance();

export const queryChatbotAgent = async (formData: any) => {
  const response = await ChatbotAgent.post("query-agent/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
