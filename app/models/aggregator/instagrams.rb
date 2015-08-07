module Aggregator::Instagrams
  def get_instagrams_by_tag(search_term, num=5)
    first_hit = Instagram.tag_search(search_term).first
    instas = Instagram.tag_recent_media(first_hit.name).first(num)
    instas.map do |i| 
      {
        name: i.user.full_name, 
        likes: i.likes.count,
        thumbnail: i.images.thumbnail.url
      }
    end
  end

  def get_instagrams_by_username(name, num=5)
    Instagram.user_search(name).first(num)
  end
end