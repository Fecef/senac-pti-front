import { api } from "./api";

export const postProductAPI = async (payload: { cliente_cpf: string; produtos: string[]; }) => {
  const { data } = await api.post("/compras/", payload);
  return data;
};
