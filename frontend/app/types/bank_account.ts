export type BankAccount = {
  id: string;
  bank_name: string;
  branch: string;
  account_type: string;
  account_number: string;
  account_holder: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
};

export type BankAccountFormData = Partial<BankAccount>;

export const emptyBankAccount: BankAccountFormData = {
  bank_name: "",
  branch: "",
  account_type: "",
  account_number: "",
  account_holder: "",
};
