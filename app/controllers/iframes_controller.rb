class IframesController < ApplicationController
  def index
  end

  def new
    headers['X-Frame-Options'] = 'ALLOWALL'
    @pf = PublicFigure.last
  end
end
