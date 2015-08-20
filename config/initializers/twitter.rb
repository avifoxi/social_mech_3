##########
=begin 

  each of Aggregator's modules is defined in 2 places
  under config/initializers => modules initially defined, and api connections are assigned under their namespace. check it out, additional comments in code there.
  
  functionality in Aggregator context is assigned in module definitions over here

=end
##########


module Aggregator::Tweets
  @@twitter = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
    config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
    config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
    config.access_token_secret = ENV["TWITTER_ACCESS_SECRET"]
  end

  def twitter_connection
    @@twitter
  end

end