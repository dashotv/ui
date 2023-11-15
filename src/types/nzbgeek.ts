export interface Nzbgeek {
  title: string;
  guid: string;
  link: string;
  comments: string;
  published: string;
  category: string;
  description: string;
  enclosure: {
    attributes: {
      url: string;
      length: string;
      type: string;
    };
  };
  attributes: {
    attribute: {
      name: string;
      value: string;
    };
  };
}
/*
	Title       string `json:"title"`
	Guid        string
	Link        string
	Comments    string
	Published   CustomTime `json:"pubDate"`
	Category    string
	Description string
	Enclosure   struct {
		Attributes struct {
			URL    string
			Length string
			Type   string
		} `json:"@attributes"`
	}
	Attributes []struct {
		Attribute struct {
			Name  string
			Value string
		} `json:"@attributes"`
	}
    */
