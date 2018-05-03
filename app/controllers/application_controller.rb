class ApplicationController < ActionController::API
  def fallback
    render :file => 'public/index.html'
  end
end
