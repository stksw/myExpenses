import { useBankAccountCache } from "@/(pages)/bank_accounts/cache";
import { useMutation } from "@tanstack/react-query";
import { BankAccountApi } from "./api_function";
import { BankAccountFormData } from "@/types/bank_account";

export const usePostBankAccount = () => {
  const { invalidateList } = useBankAccountCache();

  return useMutation({
    mutationFn: (data: BankAccountFormData) => {
      if (data.id) {
        return BankAccountApi.update(data.id, data);
      }
      return BankAccountApi.create(data);
    },
    onSuccess: () => {
      invalidateList();
    },
  });
};

export const useDeleteBankAccount = () => {
  const { invalidateList } = useBankAccountCache();

  return useMutation({
    mutationFn: (id: string) => {
      return BankAccountApi.delete(id);
    },
    onSuccess: () => {
      invalidateList();
    },
  });
};
