module Aggregator::Instagrams
  def get_instagrams_by_tag(search_term, num=5)
    Instagram.tag_search(search_term).first(num)
  end

  def get_instagrams_by_username(name, num=5)
    Instagram.user_search(name).first(num)
  end
end