class AccountTransactionImportsController < ActionController::API
  
  def create
    begin
      success_count, error = AccountTransaction.import(params[:file])

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
end