import React from 'react';

const prettyNumber = num => {
  let pretty = '';
  let digits = String(num).split('');
  let count = 0
  while (digits.length) {
    count += 1
    if (count % 3 === 0 && digits.length > 1) {
      pretty = ',' + digits.pop() + pretty;
    } else {
      pretty = digits.pop() + pretty;
    }
  }
  return pretty;
}

const Post = (post) => {
  return (
    <div className="db b1 br2 mr100 ml100 mb50 p20">
      <a className="fs20 tdn mt15 lh50" href={post.post.url} target="_blank">{post.post.title}</a>
      <p>{`Score: ${prettyNumber(post.post.score)}`}&nbsp;&nbsp;|&nbsp;&nbsp;
        {`Author: ${post.post.author}`}&nbsp;&nbsp;|&nbsp;&nbsp;
        <a href={`https://www.reddit.com${post.post.link}`} className="cp" target="_blank">
          {`${prettyNumber(post.post.comments)} comment${post.post.comments > 1 ? 's' : ''}`}
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        {post.post.subreddit}
      </p>
    </div>
  );
}

export default Post
