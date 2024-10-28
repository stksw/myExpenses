import { SubmitHandler, useForm } from "react-hook-form";
import { AccountTransactionFormData } from "@/types/account_transaction";
import { usePostAccountTransaction } from "@/apis/account_transactions/mutation";

export const useFormAccountTransaction = () => {
  const {
    handleSubmit,
    setValue,
    reset,
    register,
    control,
    formState,
    getValues,
    getFieldState,
  } = useForm<AccountTransactionFormData>({
    mode: "onChange",
  });

  const postAccountTransaction = usePostAccountTransaction();

  const onSubmit: SubmitHandler<AccountTransactionFormData> = async (data) => {
    try {
      await postAccountTransaction.mutateAsync(data);
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
    control,
    formState,
    getValues,
    getFieldState,
  };
};
