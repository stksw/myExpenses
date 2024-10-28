import { SubmitHandler, useForm } from "react-hook-form";
import { BankAccountFormData } from "@/types/bank_account";
import { usePostBankAccount } from "@/apis/bank_accounts/mutation";

export const useFormBankAccount = () => {
  const { handleSubmit, setValue, reset, register, formState } =
    useForm<BankAccountFormData>({
      mode: "onChange",
    });

  const postBankAccount = usePostBankAccount();

  const onSubmit: SubmitHandler<BankAccountFormData> = async (data) => {
    try {
      await postBankAccount.mutateAsync(data);
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return {
    onSubmit,
    handleSubmit,
    setValue,
    reset,
    register,
  };
};
