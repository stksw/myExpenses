class DashboardsController < ActionController::API

  def index
    @histories = AccountHistory.order(recorded_at: :desc)
    render json: { data: @histories }, status: :ok
  end

end