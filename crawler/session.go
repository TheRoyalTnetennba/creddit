package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"net/url"
)

type Session struct {
	useragent string
}

type LoginSession struct {
	Username  string
	Password  string
	Useragent string
	Cookie    *http.Cookie
	Modhash   string `json:"modhash"`
	Session
}

// NewLoginSession creates a new session for those who want to log into a
// reddit account.
func NewLoginSession(username, password, useragent string) (*LoginSession, error) {
	session := &LoginSession{
		Username:  username,
		Password:  password,
		Useragent: useragent,
		Session:   Session{useragent},
	}

	loginURL := fmt.Sprintf("https://www.reddit.com/api/login/%s", username)
	postValues := url.Values{
		"user":     {username},
		"passwd":   {password},
		"api_type": {"json"},
	}

	req, err := http.NewRequest("POST", loginURL, strings.NewReader(postValues.Encode()))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("User-Agent", useragent)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New(resp.Status)
	}

	// Get the session cookie.
	for _, cookie := range resp.Cookies() {
		if cookie.Name == "reddit_session" {
			session.Cookie = cookie
		}
	}

	// Get the modhash from the JSON.
	type Response struct {
		JSON struct {
			Errors [][]string
			Data   struct {
				Modhash string
			}
		}
	}

	r := &Response{}
	err = json.NewDecoder(resp.Body).Decode(r)
	if err != nil {
		return nil, err
	}

	if len(r.JSON.Errors) != 0 {
		var msg []string
		for _, k := range r.JSON.Errors {
			msg = append(msg, k[1])
		}
		return nil, errors.New(strings.Join(msg, ", "))
	}
	session.Modhash = r.JSON.Data.Modhash

	return session, nil
}
