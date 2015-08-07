module Aggregator::Tweets

  def get_tweets(terms, opts=nil)
    # for now ignore options hash beyond num
    count = opts && opts.count ? opts.count : 3  
    twitter.search(terms, result_type: "recent").take(count).map do |tweet|
      {
        hashtags: tweet.hashtags.map{|h| '#' + h.text},
        retweet_count: tweet.retweet_count,
        text: tweet.text,
        by: tweet.user.screen_name,
        created_at: tweet.created_at
      }
    end
  end

  private

  def twitter
    # when time, truly namespace this
    $twitter
  end

end