export interface NzbgeekForm {
  tvdbid?: string;
  season?: number;
  episode?: number;
}

export interface Nzbgeek {
  title: string;
  guid: string;
  link: string;
  comments: string;
  pubDate: string;
  category: string;
  description: string;
  enclosure: {
    '@attributes': {
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
  }[];
}
