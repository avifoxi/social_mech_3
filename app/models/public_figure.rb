class PublicFigure < ActiveRecord::Base

  def update_media(media_hash)
    media_hash.each do |name, posts|
      puts 'size of my tweets?'
      collection = JSON.parse(self.most_recent_tweets)
      puts collection.inspect
      puts 'NAME: ' + name.to_s
      puts "posts: #{posts.inspect}"  
    end
  end

  private
  def media_name_map 

  end
end
