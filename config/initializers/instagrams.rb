##########
=begin 

  each of Aggregator's modules is defined in 2 places
  under config/initializers => modules initially defined, and api connections are assigned under their namespace. check it out, additional comments in code there.
  
  functionality in Aggregator context is assigned in module definitions over here

  note on Instagram -- 
  the gem default configures a  global Instagram connection. I'm choosing to wrap in module bc of conventions established with my inegrations of twitter + facebook -- see other intializers + notes above

=end
##########

module Aggregator::Instagrams
  Instagram.configure do |config|
    config.client_id = ENV["INSTAGRAM_CLIENT_ID"]
    config.client_secret = ENV["INSTAGRAM_CLIENT_SECRET"]
  end

  def insta_connection 
    Instagram
  end
end