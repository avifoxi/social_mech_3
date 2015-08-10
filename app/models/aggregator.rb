class Aggregator #< ActiveRecord::Base
  
  include Aggregator::Tweets
  include Aggregator::Instagrams

  attr_reader :social_media

  def initialize(public_figure, count=5)
    @public_figure = public_figure
    @count = count
    @social_media = {
      instagrams: [],
      tweets: []
    }
    aggregate
  end

  private 

  def aggregate
    if @public_figure.instagram_id
      @social_media[:instagrams] << get_instagrams_by_tag(@public_figure.instagram_id, @count)
    end
    if @public_figure.twitter_handle
      @social_media[:tweets] = get_tweets(@public_figure.twitter_handle, @count)
    end
  end
end
