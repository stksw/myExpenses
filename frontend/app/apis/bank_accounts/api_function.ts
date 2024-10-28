import { HttpStatusCode } from "axios";
import { ServerApi } from "@/providers/axios";
import { BankAccount, BankAccountFormData } from "@/types/bank_account";

const path = "bank_accounts";

export const BankAccountApi = {
  list: async (): Promise<{ data: BankAccount[]; totalCount: number }> => {
    return await ServerApi.get(path).then((res) => res.data);
  },

  create: async (data: BankAccountFormData): Promise<BankAccount> => {
    return await ServerApi.post(path, data).then((res) => res.data);
  },

  update: async (
    id: string,
    data: BankAccountFormData
  ): Promise<BankAccount> => {
    return await ServerApi.put(`${path}/${id}`, data).then((res) => res.data);
  },

  delete: async (id: string): Promise<HttpStatusCode> => {
    return await ServerApi.delete(`${path}/${id}`).then((res) => res.data);
  },
};
