class AggregatorsController < ApplicationController
  # for now, include modules directly, bc we're just testing validity of input fields, need not instantiate new aggregator obj w query data
  include Aggregator::Tweets
  include Aggregator::Instagrams
  include Aggregator::Facebook

  layout 'react_browserify', only: :new

  def fb_id_from_string
    html = ''
    match = get_fb_id_from_page(ag_params['test_string'])
    if match
      pic = get_pic_from_id(match['id'])
      html = (render_to_string partial: 'potential_facebook_match', locals: { match: match, pic: pic }, layout: false)
    else
      html = (render_to_string partial: 'fb_no_page_match')
    end
    render json: {
      html: html
    }
  end

  def insta_id_from_string
    @result = get_insta_potential_ids_from_username(ag_params['test_string'])
    html = (render_to_string partial: 'potential_insta_users', locals: {potentials: @result}, layout: false)
    format_and_return(@result)
  end

  def index
  end

  def new
    @user = User.new
    @form = (render_to_string partial: 'users/new_sans_submit_button', locals: {user: @user}, layout: false)
  end

  def format_and_return(result=nil)
    if result
      render json: {
        html: (render_to_string partial: 'potential_insta_users', locals: {potentials: @result}, layout: false)
      }
    else
      render json: {
        error: 'Unfortunately your query returned no results.'
      }
    end
  end

  private

  def ag_params
    params.require(:aggregator).permit(:test_string)
  end
end
