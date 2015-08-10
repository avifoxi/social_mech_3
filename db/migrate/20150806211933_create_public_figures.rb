class CreatePublicFigures < ActiveRecord::Migration
  def change
    create_table :public_figures do |t|
      t.string :display_name
      
      t.string :facebook_id
      t.string :twitter_handle
      t.string :twitter_search_terms, array: true
      t.string :instagram_id
      t.string :instagram_search_tags, array: true
      t.datetime :last_queried_feeds_at

      t.json :most_recent_facebook_timeline
      t.json :most_recent_tweets
      t.json :most_recent_instagrams

      t.timestamps null: false
    end
  end
end
