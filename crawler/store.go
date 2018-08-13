package main

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
)

type Subreddit struct {
	DisplayName string
	CreatedUtc  float64
	Over18      bool
}

func Load() map[string]Subreddit {
	raw, err := ioutil.ReadFile("data.yaml")
	check(err)
	var data = make(map[string]Subreddit)
	err = yaml.Unmarshal([]byte(string(raw)), &data)
	check(err)
	return data
}

func Save(data map[string]Subreddit) {
	out, err := yaml.Marshal(&data)
	check(err)
	err = ioutil.WriteFile("data.yaml", out, 0644)
	check(err)
}

func GetEarliest(data map[string]Subreddit) string {
	least := 9999999999999.0
	id := ""
	for k, v := range data {
		if v.CreatedUtc < least {
			least = v.CreatedUtc
			id = k
		}
	}
	return id
}
