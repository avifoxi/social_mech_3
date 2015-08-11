module Aggregator::Tweets

  def get_tweets(terms, count=3)
    twitter.search(terms, result_type: "recent").take(count).map do |tweet|
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

  private

  def twitter
    # when time, truly namespace this
    $twitter
  end

end