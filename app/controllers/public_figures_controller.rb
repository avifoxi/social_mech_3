class PublicFiguresController < ApplicationController
  layout 'public_figures', only: :show

  def new
    @pf = PublicFigure.new
  end

  def create
    @pf = PublicFigure.new(pf_params)
    if @pf.save
      redirect_to public_figure_path(@pf)
    else
      render :new
    end
  end

  def show
    # default for root_path, show the mech
    id = params[:id] ? params[:id] : 3
    @pf = PublicFigure.find(id)

    respond_to do |format|
      format.html 
      format.json { render :json => @pf.to_json }
    end
  end

  def update
    @pf = PublicFigure.find(params[:id])
    respond_to do |format|
      format.json { 
        render json: {
          tweet: 'TWEEEEDILLYDEEET',
          insta: 'INSTAMYGRAMAPHONE!'
        }
      }
    end
  end

  def templates 
    @pf = PublicFigure.find(params[:public_figure_id])
    render json: {
      tweet: (render_to_string partial: '/public_figures/tweet_thumbnail', locals: {pf: @pf}, layout: false)
      # insta:
    }
  end

  private

  def pf_params
    params.require(:public_figure).permit(:display_name, :facebook_id, :twitter_handle, :twitter_search_terms, :instagram_id, :instagram_search_tags, :updated_at)
  end
end
