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
  try {
    const res = await api.delete(`/clientes/${cpf}`);
    if (res && res.status && res.status >= 400) {
      throw new Error(res.data?.message || "Erro ao remover cliente");
    }
    return res.data ?? null;
  } catch (err: any) {
    const message = err?.response?.data?.message || err?.message || "Erro ao remover cliente";
    throw new Error(message);
  }
};

export const updateCustomerAPI = async (cpf: string, cliente: { cpf?: string; telefone?: string }) => {
  const { data } = await api.patch(`/clientes/${cpf}`, cliente);
  return data;
};
export const postCustomerAPI = async (payload: { cpf: string; telefone: string; }) => {
  const { data } = await api.post("/clientes/", payload);
  return data;
};
