export interface PlexLibrary {
  allowSync: boolean;
  art: string;
  composite: string;
  filters: boolean;
  refreshing: boolean;
  thumb: string;
  key: string;
  type: string;
  title: string;
  agent: string;
  scanner: string;
  language: string;
  uuid: string;
  updatedAt: number;
  createdAt: number;
  scannedAt: number;
  content: boolean;
  directory: boolean;
  contentChangedAt: number;
  hidden: number;
  Location: PlexLocation[];
}
export interface PlexLocation {
  id: number;
  path: string;
}

export interface PlexSearchResponse {
  librarySectionTitle: string; // "",
  score: string; // "",
  ratingKey: string; // "155059",
  key: string; // "/library/metadata/155059/children",
  guid: string; // "plex://show/5d9c090dffd9ef001e99ec5b",
  type: string; // "show",
  title: string; // "Goblin Slayer",
  librarySectionID: number; // 0,
  librarySectionKey: string; // "",
  summary: string; // "A young priestess has formed her first adventuring party, but almost immediately they find themselves in distress. It's the Goblin Slayer who comes to their rescue--a man who's dedicated his life to the extermination of all goblins, by any means necessary. And when rumors of his feats begin to circulate, there's no telling who might come calling next.",
  index: number; // 1,
  year: number; // 2018,
  thumb: string; // "/library/metadata/155059/thumb/1703774418",
  art: string; // "/library/metadata/155059/art/1703774418",
  theme: string; // "/library/metadata/155059/theme/1703774418",
  originallyAvailableAt: string; // "2018-01-01",
}