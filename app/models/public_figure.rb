class PublicFigure < ActiveRecord::Base

  def update_media(media_hash)
    media_hash.each do |social_network_key, posts|
      self[social_network_key] = posts
    end
    # at this point we are not saving ANY backlog of posts, only N most recent of any social network posts 
    self.save
  end

  private

end
