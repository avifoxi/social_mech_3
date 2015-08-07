class PublicFiguresController < ApplicationController
  layout 'public_figures'

  def new
    @pf = PublicFigure.new
  end

  def create
    p '#'*80
    p 'params'
    p "#{params.inspect}"
    @pf = PublicFigure.new(pf_params)
    if @pf.save
      redirect_to public_figure_path(@pf)
    else
      render :new
    end
  end

  def show
    @pf = PublicFigure.find(params[:id])
  end

  private

  def pf_params
    params.require(:public_figure).permit(:display_name, :facebook_id, :twitter_handle, :twitter_search_terms, :instagram_id, :instagram_search_tags)
  end
end
