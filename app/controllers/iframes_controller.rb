class IframesController < ApplicationController
  def index
  end

  # def new
  #   headers['X-Frame-Options'] = 'ALLOWALL'
  #   @pf = PublicFigure.last

  #   render
  # end
  
  def new
    @pf = PublicFigure.new
    @user = User.new
  end
end
