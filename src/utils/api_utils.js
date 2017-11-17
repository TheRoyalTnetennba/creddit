const baseURL = 'http://localhost:5000/';

const getForm = (obj) => {
  const payload = Object.assign(obj);
  return JSON.stringify(payload);
};

const header = new Headers({
  // 'Access-Control-Allow-Origin': '*',
  // 'Content-Type': 'application/json'
});

const searchURL = (query) => `https://www.reddit.com/subreddits/search.json?q=${query.toLowerCase()}`;

export const searchSubreddits = (query) => (
    fetch(searchURL(query), {
    header,
    method: 'GET',
  })
);