module Aggregator::Instagrams
  def get_instagrams(search_term, num=5)
    Instagram.tag_search(search_term).first(num)
  end
end