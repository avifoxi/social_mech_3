# $facebook_graph_api = Koala::Facebook::API.new(ENV["FACEBOOK_GRAPH_API_TOKEN"])
@oauth = Koala::Facebook::OAuth.new(ENV['FB_APP_ID'], ENV['FB_APP_SECRET'])
$fb_graph_api = Koala::Facebook::API.new(@oauth.get_app_access_token)