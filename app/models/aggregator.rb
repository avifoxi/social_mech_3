class Aggregator < ActiveRecord::Base
  include Aggregator::Tweets
  include Aggregator::Instagrams

end
