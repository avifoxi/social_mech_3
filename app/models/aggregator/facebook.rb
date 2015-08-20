module Aggregator::Facebook

  def get_fb_id_from_page(title)
    begin 
      found = fb_graph_api.get_page(title)
      return found['id']
    rescue 
      nil
    end
  end

  def get_facebook_feed(fb_id, num=5)
    feed = fb_graph_api.get_connections(fb_id, 'feed') # possible to return limited amount in query?
    feed.first(num)
  end

end