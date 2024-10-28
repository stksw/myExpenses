import { ChangeEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountTransactionImportFormData } from "@/types/account_transaction";
import { usePostAccountTransactionImport } from "@/apis/account_transaction_imports/mutation";

export const useFormAccountTransactionImport = () => {
  const { handleSubmit, setValue, reset } =
    useForm<AccountTransactionImportFormData>({
      mode: "onChange",
    });

  const postAccountTransactionImport = usePostAccountTransactionImport();
  const fileRef = useRef<HTMLInputElement>(null);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    reset();
    await setValue("file", e.target.files[0]);
  };

  const onSubmit: SubmitHandler<AccountTransactionImportFormData> = async (
    data
  ) => {
    try {
      postAccountTransactionImport.mutateAsync(data);
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  };

  return {
    fileRef,
    onSubmit,
    handleSubmit,
    onChangeFile,
  };
};
