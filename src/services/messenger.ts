import { whatsappAPI } from "./api";

export const sendMessageAPI = async (phone: string, message: string) => {
  const payload = {to: phone, body: message};
  const { data } = await whatsappAPI.post("/messages/text", payload);
  return data;
};
