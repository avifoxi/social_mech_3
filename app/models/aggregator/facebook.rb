module Aggregator::Facebook

  def get_fb_id_from_page(title)
    $fb_graph_api.get_page(title)['id']
  end

  def get_facebook_feed(fb_id, num)
    $fb_graph_api.get_connections(fb_id, 'feed') # possible to return limited amount in query ? untested
  end

end