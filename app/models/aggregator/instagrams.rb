module Aggregator::Instagrams
  def get_instagrams_by_tag(search_term, num=5)
    instas = insta_connection.tag_recent_media(search_term).first(num)
    format_instas(instas)
  end

  def get_instagrams_by_insta_id(insta_id, num=5)
    instas = insta_connection.user_media_feed(insta_id).first(num)
    format_instas(instas)
  end
  
  def get_insta_potential_ids_from_username(name)
    matches = insta_connection.user_search(name) # returns massive hash of potential matches -- user probably needs to select the correct one
    p '#'*80
    p 'matches from insta, unformatted'
    p "#{matches.inspect}"
    formatted = matches.map do |match|
      puts match['profile_picture'] 
      {
        profile_picture: match['profile_picture'],
        id: match['id'], 
        username: match['username']
      }
    end
    p '#'*80
    p 'formatted'
    p "#{formatted.inspect}" 
    return formatted
  end

  def format_instas(instas)
    instas.map do |i| 
      {
        name: i.user.full_name, 
        likes: i.likes.count,
        image: i.images.standard_resolution.url,
        caption_text: i.caption.text,
        # passes date string in Unix timestamp
        created_at: Time.at(i.created_time.to_i).to_date,
        id: i.id,
        link: i.link
      }
    end
  end
end