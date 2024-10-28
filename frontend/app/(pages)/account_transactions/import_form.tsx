import { Button, Dialog, Flex, Link } from "@radix-ui/themes";
import { useFormAccountTransactionImport } from "@/hooks/use_form_account_transaction_import";

export const ImportForm = () => {
  const { onSubmit, handleSubmit, fileRef, onChangeFile } =
    useFormAccountTransactionImport();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog.Title>取引履歴のインポート</Dialog.Title>
      <Dialog.Description mt="4">
        指定のExcelによる取引履歴の一括登録が可能です。
      </Dialog.Description>
      <Link href="/docs/account_transaction_import.xlsx" color="indigo">
        Excelをダウンロード
      </Link>
      <Flex mt="4">
        <input
          id="files"
          type="file"
          accept=".xlsx"
          ref={fileRef}
          onChange={onChangeFile}
        />
      </Flex>

      <Flex gap="3" mt="4" ml="auto" justify="end">
        <Dialog.Close>
          <Button color="gray" variant="outline">
            キャンセル
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button type="submit" color="indigo" aria-label="Close">
            アップロード
          </Button>
        </Dialog.Close>
      </Flex>
    </form>
  );
};
