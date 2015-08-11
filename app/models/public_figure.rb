class PublicFigure < ActiveRecord::Base

  def update_media(media_hash)
    new_media_to_return = {
      'tweets': [],
      'instas': []
    }
    media_hash.each do |social_network_key, posts|
      my_key = media_keys_map[social_network_key]
      posts.each do |post|
        if post[:created_at] >= self.updated_at
          new_media_to_return[my_key] << post
        end
      end

      # at this point we are not saving ANY backlog of posts, only N most recent of any social network posts 

      self[social_network_key] = posts
    end

    self.save
    new_media_to_return
  end

  private

  def media_keys_map
    {
      'most_recent_tweets': :tweets,
      'most_recent_instagrams': :instas
    }
  end
    

end
