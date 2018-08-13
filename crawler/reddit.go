package main

import (
	"encoding/json"
	"io"
)

type RedditData struct {
	Kind string `json:"kind"`
	Data struct {
		Modhash  string `json:"modhash"`
		Dist     int    `json:"dist"`
		Children []struct {
			Kind string `json:"kind"`
			Data struct {
				DisplayName string  `json:"display_name"`
				Over18      bool    `json:"over18"`
				Name        string  `json:"name"`
				CreatedUtc  float64 `json:"created_utc"`
			} `json:"data"`
		} `json:"children"`
		After  string      `json:"after"`
		Before interface{} `json:"before"`
	} `json:"data"`
}

func (rd *RedditData) Parse(r io.Reader) error {
	return json.NewDecoder(r).Decode(rd)
}

func (rd *RedditData) Write(w io.Writer) error {
	return json.NewEncoder(w).Encode(rd)
}

func (rd *RedditData) String() string {
	byteArray, err := json.Marshal(rd)
	if err != nil {
		return ""
	}
	return string(byteArray[:])
}

func (rd *RedditData) GetSubredditList() []Subreddit {
	var subreddits = []Subreddit{}
	for _, child := range rd.Data.Children {
		d := child.Data
		subreddits = append(subreddits, Subreddit{
			DisplayName: d.DisplayName,
			CreatedUtc:  d.CreatedUtc,
		})
	}
	return subreddits
}
