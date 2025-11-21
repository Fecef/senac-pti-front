import { api } from "./api";

export const getCustomerListAPI = async () => {
  const { data } = await api.get("/clientes");
  return data;
};
export const getCustomerDetailsAPI = async (cpf: string) => {
  const { data } = await api.get(`/clientes/${cpf}`);
  return data;
};

export const removeCustomerAPI = async (cpf: string) => {
  const { data } = await api.delete(`/clientes/${cpf}`);
  return data;
};

export const updateCustomerAPI = async (cpf: string, cliente: {cpf?: string, telefone?: string}) => {
  const { data } = await api.patch(`/clientes/${cpf}`, cliente);
  return data;
};