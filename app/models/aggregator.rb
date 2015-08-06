class Aggregator < ActiveRecord::Base
  
  # this doesn't need to inherit from AR::Base

  include Aggregator::Tweets
  include Aggregator::Instagrams

end
