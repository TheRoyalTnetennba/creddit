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
				SuggestedCommentSort      interface{}   `json:"suggested_comment_sort"`
				UserFlairBackgroundColor  interface{}   `json:"user_flair_background_color"`
				HideAds                   bool          `json:"hide_ads"`
				BannerImg                 string        `json:"banner_img"`
				UserFlairText             interface{}   `json:"user_flair_text"`
				SubmitTextHTML            string        `json:"submit_text_html"`
				UserFlairPosition         string        `json:"user_flair_position"`
				UserFlairEnabledInSr      bool          `json:"user_flair_enabled_in_sr"`
				UserFlairTemplateID       interface{}   `json:"user_flair_template_id"`
				UserIsBanned              interface{}   `json:"user_is_banned"`
				CommunityIcon             string        `json:"community_icon"`
				BannerBackgroundImage     string        `json:"banner_background_image"`
				OriginalContentTagEnabled bool          `json:"original_content_tag_enabled"`
				WikiEnabled               bool          `json:"wiki_enabled"`
				BannerSize                interface{}   `json:"banner_size"`
				ShowMedia                 bool          `json:"show_media"`
				BannerBackgroundColor     string        `json:"banner_background_color"`
				DisplayNamePrefixed       string        `json:"display_name_prefixed"`
				UserIsMuted               interface{}   `json:"user_is_muted"`
				UserFlairType             string        `json:"user_flair_type"`
				UserCanFlairInSr          interface{}   `json:"user_can_flair_in_sr"`
				DisplayName               string        `json:"display_name"`
				HeaderImg                 interface{}   `json:"header_img"`
				DescriptionHTML           string        `json:"description_html"`
				Title                     string        `json:"title"`
				CollapseDeletedComments   bool          `json:"collapse_deleted_comments"`
				ID                        string        `json:"id"`
				UserHasFavorited          interface{}   `json:"user_has_favorited"`
				PublicDescription         string        `json:"public_description"`
				ShowMediaPreview          bool          `json:"show_media_preview"`
				Over18                    bool          `json:"over18"`
				PublicDescriptionHTML     string        `json:"public_description_html"`
				Created                   float64       `json:"created"`
				AllowVideos               bool          `json:"allow_videos"`
				SpoilersEnabled           bool          `json:"spoilers_enabled"`
				IconSize                  interface{}   `json:"icon_size"`
				PrimaryColor              string        `json:"primary_color"`
				AudienceTarget            string        `json:"audience_target"`
				AllOriginalContent        bool          `json:"all_original_content"`
				NotificationLevel         interface{}   `json:"notification_level"`
				ActiveUserCount           interface{}   `json:"active_user_count"`
				IconImg                   string        `json:"icon_img"`
				HeaderTitle               interface{}   `json:"header_title"`
				Description               string        `json:"description"`
				CanAssignLinkFlair        bool          `json:"can_assign_link_flair"`
				SubmitText                string        `json:"submit_text"`
				UserFlairTextColor        interface{}   `json:"user_flair_text_color"`
				AccountsActive            interface{}   `json:"accounts_active"`
				PublicTraffic             bool          `json:"public_traffic"`
				HeaderSize                interface{}   `json:"header_size"`
				Subscribers               int           `json:"subscribers"`
				UserFlairCSSClass         interface{}   `json:"user_flair_css_class"`
				SubmitTextLabel           interface{}   `json:"submit_text_label"`
				WhitelistStatus           interface{}   `json:"whitelist_status"`
				LinkFlairPosition         string        `json:"link_flair_position"`
				UserFlairRichtext         []interface{} `json:"user_flair_richtext"`
				UserSrFlairEnabled        interface{}   `json:"user_sr_flair_enabled"`
				Lang                      string        `json:"lang"`
				UserIsModerator           interface{}   `json:"user_is_moderator"`
				HasMenuWidget             bool          `json:"has_menu_widget"`
				IsEnrolledInNewModmail    interface{}   `json:"is_enrolled_in_new_modmail"`
				KeyColor                  string        `json:"key_color"`
				Name                      string        `json:"name"`
				CanAssignUserFlair        bool          `json:"can_assign_user_flair"`
				AllowVideogifs            bool          `json:"allow_videogifs"`
				URL                       string        `json:"url"`
				Quarantine                bool          `json:"quarantine"`
				Wls                       interface{}   `json:"wls"`
				CreatedUtc                float64       `json:"created_utc"`
				EmojisEnabled             bool          `json:"emojis_enabled"`
				UserIsContributor         interface{}   `json:"user_is_contributor"`
				SubmitLinkLabel           interface{}   `json:"submit_link_label"`
				AllowDiscovery            bool          `json:"allow_discovery"`
				AccountsActiveIsFuzzed    bool          `json:"accounts_active_is_fuzzed"`
				AdvertiserCategory        interface{}   `json:"advertiser_category"`
				UserSrThemeEnabled        bool          `json:"user_sr_theme_enabled"`
				LinkFlairEnabled          bool          `json:"link_flair_enabled"`
				AllowImages               bool          `json:"allow_images"`
				VideostreamLinksCount     int           `json:"videostream_links_count"`
				CommentScoreHideMins      int           `json:"comment_score_hide_mins"`
				SubredditType             string        `json:"subreddit_type"`
				SubmissionType            string        `json:"submission_type"`
				UserIsSubscriber          interface{}   `json:"user_is_subscriber"`
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
			HideAds:                   d.HideAds,
			BannerImg:                 d.BannerImg,
			SubmitTextHTML:            d.SubmitTextHTML,
			UserFlairPosition:         d.UserFlairPosition,
			UserFlairEnabledInSr:      d.UserFlairEnabledInSr,
			CommunityIcon:             d.CommunityIcon,
			BannerBackgroundImage:     d.BannerBackgroundImage,
			OriginalContentTagEnabled: d.OriginalContentTagEnabled,
			WikiEnabled:               d.WikiEnabled,
			ShowMedia:                 d.ShowMedia,
			BannerBackgroundColor:     d.BannerBackgroundColor,
			DisplayNamePrefixed:       d.DisplayNamePrefixed,
			UserFlairType:             d.UserFlairType,
			DisplayName:               d.DisplayName,
			DescriptionHTML:           d.DescriptionHTML,
			Title:                     d.Title,
			CollapseDeletedComments: d.CollapseDeletedComments,
			ID:                     d.ID,
			PublicDescription:      d.PublicDescription,
			ShowMediaPreview:       d.ShowMediaPreview,
			Over18:                 d.Over18,
			PublicDescriptionHTML:  d.PublicDescriptionHTML,
			Created:                d.Created,
			AllowVideos:            d.AllowVideos,
			SpoilersEnabled:        d.SpoilersEnabled,
			PrimaryColor:           d.PrimaryColor,
			AudienceTarget:         d.AudienceTarget,
			AllOriginalContent:     d.AllOriginalContent,
			IconImg:                d.IconImg,
			Description:            d.Description,
			CanAssignLinkFlair:     d.CanAssignLinkFlair,
			SubmitText:             d.SubmitText,
			PublicTraffic:          d.PublicTraffic,
			Subscribers:            d.Subscribers,
			LinkFlairPosition:      d.LinkFlairPosition,
			Lang:                   d.Lang,
			HasMenuWidget:          d.HasMenuWidget,
			KeyColor:               d.KeyColor,
			Name:                   d.Name,
			CanAssignUserFlair:     d.CanAssignUserFlair,
			AllowVideogifs:         d.AllowVideogifs,
			URL:                    d.URL,
			Quarantine:             d.Quarantine,
			CreatedUtc:             d.CreatedUtc,
			EmojisEnabled:          d.EmojisEnabled,
			AllowDiscovery:         d.AllowDiscovery,
			AccountsActiveIsFuzzed: d.AccountsActiveIsFuzzed,
			UserSrThemeEnabled:     d.UserSrThemeEnabled,
			LinkFlairEnabled:       d.LinkFlairEnabled,
			AllowImages:            d.AllowImages,
			VideostreamLinksCount:  d.VideostreamLinksCount,
			CommentScoreHideMins:   d.CommentScoreHideMins,
			SubredditType:          d.SubredditType,
			SubmissionType:         d.SubmissionType,
		})
	}
	return subreddits
}
