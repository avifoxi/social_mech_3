##########
=begin 

  each of Aggregator's modules is defined in 2 places
  under config/initializers => modules initially defined, and api connections are assigned under their namespace. check it out, additional comments in code there.
  
  functionality in Aggregator context is assigned in module definitions over here

=end
##########

class Aggregator
  
  include Aggregator::Tweets
  include Aggregator::Instagrams
  include Aggregator::Facebook

  attr_reader :social_media

  # def initialize(public_figure, count=5)
  #   @public_figure = public_figure
  #   @count = count
  #   @social_media = {
  #     most_recent_instagrams: [],
  #     most_recent_tweets: []
  #   }
  #   aggregate
  # end

  private 

  def aggregate
    if @public_figure.instagram_id
      @social_media[:most_recent_instagrams] = get_instagrams_by_tag(@public_figure.instagram_id, @count)
    end
    if @public_figure.twitter_handle
      @social_media[:most_recent_tweets] = get_tweets(@public_figure.twitter_handle, @count)
    end
  end
end
