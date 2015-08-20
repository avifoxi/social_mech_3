##########
=begin 

  Aggregator Model + Modules defined in app/models 
  to avoid global variables, and assign 3rd party api hooks to Aggregator namespace
  initialization opens the module definition, and the rest of the functionality is monkey patched under
  app/models/aggregator

=end
##########


module Aggregator::Facebook
  oauth = Koala::Facebook::OAuth.new(ENV['FB_APP_ID'], ENV['FB_APP_SECRET'])
  @@fb_connection = Koala::Facebook::API.new(oauth.get_app_access_token)

  def fb_graph_api
    @@fb_connection
  end

end