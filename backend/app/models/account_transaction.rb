class AccountTransaction < ApplicationRecord
  self.inheritance_column = :_type_disabled
  belongs_to :bank_account

  enum :type, { deposit: 'deposit', withdrawal: 'withdrawal' }, default: 'withdrawal'

  def self.with_bank_account
    includes(:bank_account).order(recorded_at: :asc).map do |account_transaction|
      account_transaction.attributes.merge(bank_name: account_transaction.bank_account.bank_name)
    end
  end

  def self.import(file)
    success_count, error = 0, nil
    branches = BankAccount.all.map { |ac| { id: ac.id, name: ac.name_with_branch } }

    if file.nil?
      error = 'ファイルが選択されていません'
      return success_count, error
    end

    spreadsheet = Roo::Spreadsheet.open(file.path)
    header = spreadsheet.row(1)

    (2..spreadsheet.last_row).map do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
  
      account_transaction = AccountTransaction.new
      account_transaction.recorded_at = row['recorded_at']
      account_transaction.description = row['description']
      account_transaction.type = row['type']
      account_transaction.amount = row['amount']
      branch = branches.find {|b| b[:name] == row['branch_name'] }
      if branch.present?
        account_transaction.bank_account_id = branch[:id]
      end
      account_transaction.save!
      success_count += 1
    end
    return success_count, error
  end

end
