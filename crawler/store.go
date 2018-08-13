package main

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
)

type Subreddit struct {
	HideAds                   bool
	BannerImg                 string
	SubmitTextHTML            string
	UserFlairPosition         string
	UserFlairEnabledInSr      bool
	CommunityIcon             string
	BannerBackgroundImage     string
	OriginalContentTagEnabled bool
	WikiEnabled               bool
	ShowMedia                 bool
	BannerBackgroundColor     string
	DisplayNamePrefixed       string
	UserFlairType             string
	DisplayName               string
	DescriptionHTML           string
	Title                     string
	CollapseDeletedComments   bool
	ID                        string
	PublicDescription         string
	ShowMediaPreview          bool
	Over18                    bool
	PublicDescriptionHTML     string
	Created                   float64
	AllowVideos               bool
	SpoilersEnabled           bool
	PrimaryColor              string
	AudienceTarget            string
	AllOriginalContent        bool
	IconImg                   string
	Description               string
	CanAssignLinkFlair        bool
	SubmitText                string
	PublicTraffic             bool
	Subscribers               int
	LinkFlairPosition         string
	Lang                      string
	HasMenuWidget             bool
	KeyColor                  string
	Name                      string
	CanAssignUserFlair        bool
	AllowVideogifs            bool
	URL                       string
	Quarantine                bool
	CreatedUtc                float64
	EmojisEnabled             bool
	AllowDiscovery            bool
	AccountsActiveIsFuzzed    bool
	UserSrThemeEnabled        bool
	LinkFlairEnabled          bool
	AllowImages               bool
	VideostreamLinksCount     int
	CommentScoreHideMins      int
	SubredditType             string
	SubmissionType            string
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
