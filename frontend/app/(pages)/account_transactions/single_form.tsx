import { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Button,
  Flex,
  Text,
  TextField,
  Dialog,
  Select,
} from "@radix-ui/themes";
import { useFormAccountTransaction } from "@/hooks/use_form_account_transaction";
import { useDeleteAccountTransaction } from "@/apis/account_transactions/mutation";
import { AccountTransactionFormData } from "@/types/account_transaction";

export const SingleForm = ({ data }: { data: AccountTransactionFormData }) => {
  const { onSubmit, handleSubmit, register, setValue, reset, control } =
    useFormAccountTransaction();
  const deleteAccountTransaction = useDeleteAccountTransaction();

  useEffect(() => {
    if (data.id !== "") {
      setValue("id", data.id);
      setValue("recorded_at", data.recorded_at);
      setValue("description", data.description);
      setValue("type", data.type);
      setValue("amount", data.amount);
      setValue("bank_account_id", String(data.bank_account_id));
      setValue("import", data.import);
    } else {
      reset();
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog.Title>口座取引の追加・編集</Dialog.Title>
      <Dialog.Description mt="4" mb="4">
        口座取引の追加・編集ができます。
      </Dialog.Description>
      <Flex direction="column" gap="3" pt="2">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            取引日
          </Text>
          <TextField.Root
            placeholder={new Date().toISOString()}
            {...register("recorded_at")}
          />
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            内容
          </Text>
          <TextField.Root
            placeholder="◯◯◯株式会社"
            {...register("description")}
          />
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            取引種別
          </Text>

          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field }) => {
              const { ref, ...fieldWithoutRef } = field;
              return (
                <Select.Root
                  onValueChange={field.onChange}
                  {...fieldWithoutRef}
                >
                  <Select.Trigger placeholder="入金か出金を選んでください" />
                  <Select.Content color="indigo">
                    <Select.Group>
                      <Select.Item value="deposit">入金</Select.Item>
                      <Select.Item value="withdrawal">出金</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              );
            }}
          ></Controller>
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            取引金額
          </Text>
          <TextField.Root placeholder="100000" {...register("amount")} />
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            金融機関
          </Text>

          <Controller
            control={control}
            name="bank_account_id"
            rules={{ required: true }}
            render={({ field }) => {
              const { ref, ...fieldWithoutRef } = field;
              return (
                <Select.Root
                  onValueChange={field.onChange}
                  {...fieldWithoutRef}
                >
                  <Select.Trigger placeholder="金融機関を選んでください" />
                  <Select.Content color="indigo">
                    <Select.Group>
                      <Select.Item value="6">
                        三菱東京UFJ銀行 渋谷明治通支店
                      </Select.Item>
                      <Select.Item value="5">
                        三井住友銀行 小石川支店
                      </Select.Item>
                      <Select.Item value="8">
                        三井住友銀行 オリーブASH支店
                      </Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              );
            }}
          ></Controller>
        </label>
      </Flex>
      <Flex mt="4">
        {data.id && (
          <Flex gap="3" mt="4">
            <Dialog.Close>
              <Button
                type="button"
                color="ruby"
                variant="solid"
                onClick={() => deleteAccountTransaction.mutateAsync(data.id!)}
              >
                削除
              </Button>
            </Dialog.Close>
          </Flex>
        )}
        <Flex gap="3" mt="4" ml="auto" justify="end">
          <Dialog.Close>
            <Button color="gray" variant="outline">
              キャンセル
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button type="submit" color="indigo" aria-label="Close">
              保存
            </Button>
          </Dialog.Close>
        </Flex>
      </Flex>
    </form>
  );
};
