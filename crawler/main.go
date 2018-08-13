package main

import (
	"fmt"

	"net/http"
	// "encoding/json"
)

// map[name] display_name

func check(err error) {
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
}

func processRedditData(data map[string]Subreddit, redditData *RedditData) {
	subreddits := redditData.GetSubredditList()
	for _, child := range subreddits {
		data[child.Name] = child
	}
}

func crawl(data map[string]Subreddit, after string, pages int) {
	if pages < 0 {
		return
	}
	client := &http.Client{}

	url := "https://www.reddit.com/subreddits/new/.json?limit=100"
	if len(after) > 0 {
		url += fmt.Sprintf("&after=%s", after)
	}

	req, err := http.NewRequest("GET", url, nil)
	req.Header.Set("User-agent", "creddit-1234")

	res, err := client.Do(req)
	check(err)

	redditData := &RedditData{}

	err = redditData.Parse(res.Body)
	check(err)
	processRedditData(data, redditData)

	res.Body.Close()
	fmt.Println(fmt.Sprintf("Only %v pages remaining!", pages))

	if pages % 10 == 0 {
		Save(data)
		fmt.Println("Saved Successfully")
	}
	crawl(data, redditData.Data.After, pages-1)

}

func main() {
	data := Load()
	after := GetEarliest(data)
	crawl(data, after, 150)
}
