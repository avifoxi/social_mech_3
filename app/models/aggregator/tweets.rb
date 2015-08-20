module Aggregator::Tweets

  def get_tweets_by_search_term(term, count=3)
    twitter_connection.search(term, result_type: "recent").take(count).map do |tweet|
      {
        hashtags: tweet.hashtags.map{|h| '#' + h.text},
        retweet_count: tweet.retweet_count,
        text: tweet.text,
        by: tweet.user.screen_name,
        created_at: tweet.created_at,
        id: tweet.id,
        tweeter_url: "https://twitter.com/" + tweet.user.screen_name
      }
    end
  end

end