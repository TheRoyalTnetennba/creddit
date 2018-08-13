package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func check(err error) {
	if err != nil {
		fmt.Println(err)
		panic(err)
	}
}

func processRedditData(data map[string]Subreddit, redditData *RedditData) {
	for _, child := range redditData.Data.Children {
		d := child.Data
		data[d.Name] = Subreddit{
			DisplayName: d.DisplayName,
			CreatedUtc:  d.CreatedUtc,
			Over18:      d.Over18,
		}
		if d.Over18 {
			fmt.Println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		}
	}

}

func crawl(data map[string]Subreddit, after string, pages int, userAgent string) {
	client := &http.Client{}

	url := "https://www.reddit.com/subreddits/new/.json?limit=100"
	if len(after) > 0 {
		url += fmt.Sprintf("&after=%s", after)
	}

	req, err := http.NewRequest("GET", url, nil)

	req.Header.Set("User-agent", userAgent)

	res, err := client.Do(req)
	check(err)

	redditData := &RedditData{}

	err = redditData.Parse(res.Body)
	if err != nil {
		var thing = make(map[string]interface{})
		json.NewDecoder(res.Body).Decode(&thing)
		fmt.Println(thing)
		check(err)
	}
	processRedditData(data, redditData)

	res.Body.Close()
	fmt.Println(fmt.Sprintf("Only %v pages remaining!", pages))

	if pages%100 == 0 {
		Save(data)
		fmt.Println("Saved Successfully")
	}

	if len(redditData.Data.After) > 0 && pages > 0 {
		crawl(data, redditData.Data.After, pages-1, userAgent)
	}

}

func login(userAgent string) {
	session, _ := NewLoginSession(
		"username",
		"password",
		userAgent,
	)
	fmt.Println(session.Modhash)
}

func main() {
	userAgent := randString(24)
	if 3 > 4 {
		data := Load()
		after := GetEarliest(data)

		crawl(data, after, 999, userAgent)
	}
	login(userAgent)
}
