class AggregatorsController < ApplicationController
  # for now, include modules directly, bc we're just testing validity of input fields, need not instaniate new aggregator obj w query data
  include Aggregator::Tweets
  include Aggregator::Instagrams
  include Aggregator::Facebook


  def fb_id_from_string
    result = get_fb_id_from_page(ag_params['test_string'])
    format_and_return(result)
  end

  def insta_id_from_string
    result = get_insta_potential_ids_from_username(ag_params['test_string'])
    format_and_return(result)
  end

  def index
  end

  def format_and_return(result=nil)
    if result
      render json: result.to_json
    else
      render json: {
        failed_query: 'Unfortunately your query returned no results.'
      }
    end
  end

  private

  def ag_params
    params.require(:aggregator).permit(:test_string)
  end
end
