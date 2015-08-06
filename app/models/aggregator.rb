class Aggregator < ActiveRecord::Base
  class << self
    # TODO twitter, instagram, koala / facebook all instantiated + configured in config/initializers
    attr_accessor :twitter
  end

  def self.get_tweets
    $twitter.search("to:justinbieber marry me", result_type: "recent").take(3).collect do |tweet|
      "#{tweet.user.screen_name}: #{tweet.text}"
    end
  end

end
