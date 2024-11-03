class DashboardsController < ActionController::API

  def index
    @histories = AccountHistory.order(recorded_at: :asc)
    render json: { data: @histories }, status: :ok
  end

end