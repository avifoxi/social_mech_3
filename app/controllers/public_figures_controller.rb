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
    # id = params[:id] ? params[:id] : 3
    @pf = PublicFigure.first #ind(id)

    respond_to do |format|
      format.html 
      format.json { render :json => @pf.to_json }
    end
  end

  def update
    @pf = PublicFigure.find(params[:id])

    # json requests containing the :updated_at key are requests for an updated aggregate feed.
    # ensure 10 minute intervals between aggregate requests to 3rd parties
    if verify_time(pf_params[:updated_at])
      thumbs = aggregate_to_thumbnails_json
      render_thumb_html()
    end
    
    respond_to do |format|
      format.json { 
        render json: {
          tweets: 'TWEEEEDILLYDEEET',
          instas: 'INSTAMYGRAMAPHONE!'
        }
      }
    end
  end

  def templates 
    render json: {
      insta: (render_to_string '/public_figures/insta_lodash_temp', layout: false),
      tweet: (render_to_string '/public_figures/tweet_lodash_temp', layout: false)
    }
  end

  private

  def pf_params
    params.require(:public_figure).permit(:display_name, :facebook_id, :twitter_handle, :twitter_search_terms, :instagram_id, :instagram_search_tags, :updated_at)
  end

  def verify_time(iso_string)
    unless iso_string
      return false
    end
    last_updated = Time.new(iso_string)
    now = Time.new
    now - last_updated >= 10.minutes
  end

  def aggregate_to_thumbnails_json
    begin
      agatha = Aggregator.new(@pf)
      @pf.update_media(agatha.social_media)
    rescue => e
      {errors: e} 
    end
  end

# rendered_thumbnails = {}
      # if sm.tweets
      #   rendered_thumbnails[:tweets] = render_tweetnails(sm.tweets)
      # end
      # if sm.instagrams
      #   rendered_thumbnails[:instas] = render_instanails(sm.instagrams)
      # end
      # return rendered_thumbnails
  def render_tweetnails(tweets)
  end
end
