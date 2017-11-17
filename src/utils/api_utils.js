const searchURL = query => `https://www.reddit.com/subreddits/search.json?q=${query.toLowerCase()}`;

const subredditURL = (url, after) => {
  let first = `https://www.reddit.com${url}.json`
  let other = `https://www.reddit.com${url}.json?count=25&after=${after}`
  return after ? other : first;
}

export const searchSubreddits = (query) => (
    fetch(searchURL(query), {
    method: 'GET',
  })
);

export const viewSubreddit = (url, after) => (
    fetch(subredditURL(url, after), {
    method: 'GET',
  })
);