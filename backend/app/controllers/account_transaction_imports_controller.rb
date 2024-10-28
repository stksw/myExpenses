class AccountTransactionImportsController < ActionController::API
  
  def create
    begin
      success_count, error = AccountTransaction.import(account_transaction_import_params[:file])
      if error.present?
        render json: { message: error }, status: :unprocessable_entity
        return
      end

      render json: { message: "#{success_count}件の取引がインポートされました" }, status: :ok
    rescue Exception => e
      render json: { error: '無効なファイル形式です' }, status: :unprocessable_entity
      return
    end
  end

  private

    def account_transaction_import_params
      params.require(:account_transaction_import).permit(:file)
    end

end