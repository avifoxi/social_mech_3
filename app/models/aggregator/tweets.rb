module Aggregator::Tweets

  def get_tweets(terms, opts=nil)
    # for now ignore options hash beyond num
    count = opts && opts.count ? opts.count : 3  
    twitter.search(terms, result_type: "recent").take(count)
  end

  private

  def twitter
    # when time, truly namespace this
    $twitter
  end

end