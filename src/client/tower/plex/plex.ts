export interface Device {} //TODO: Add Device interface

export interface Library {
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
  Location: Location[];
}
export interface Location {
  id: number;
  path: string;
}
export interface Collection {
  ratingKey: string;
  key: string;
  guid: string;
  type: string;
  title: string;
  librarySectionID: number;
  librarySectionTitle: string;
  librarySectionKey: string;
  subtype: string;
  summary: string;
  thumb: string;
  addedAt: number;
  updatedAt: number;
  childCount: string;
  maxYear: string;
  minYear: string;
  children: CollectionChild[];
}
export interface SearchResponse {
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

export interface SearchMetadata {
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

/*
    "name": "SHIELD Android TV",
    "product": " for Android (TV)",
    "productVersion": "10.8.0.5554",
    "platform": "Android",
    "platformVersion": "11",
    "device": "SHIELD Android TV",
    "clientIdentifier": "972291a8b1cb9552-com-plexapp-android",
    */
export interface Client {
  name: string;
  product: string;
  productVersion: string;
  platform: string;
  platformVersion: string;
  device: string;
  clientIdentifier: string;
}
export interface Resource {
  name: string;
  product: string;
  productVersion: string;
  platform: string;
  platformVersion: string;
  device: string;
  clientIdentifier: string;
}
export interface CollectionChild {
  ratingKey: string;
  key: string;
  guid: string;
  type: string;
  title: string;
  librarySectionID: number;
  librarySectionKey: string;
  librarySectionTitle: string;
  summary: string;
  thumb: string;
  total: string;
  viewed: string;
  next: string;
  lastViewedAt: string;
  addedAt: string;
  updatedAt: string;
}

export interface EventSessions {
  sessions: Session[];
}

export interface Session {
  addedAt: number;
  art: string;
  contentRating: string;
  duration: number;
  grandparentArt: string;
  grandparentGuid: string;
  grandparentKey: string;
  grandparentRatingKey: string;
  grandparentSlug: string;
  grandparentThumb: string;
  grandparentTitle: string;
  guid: string;
  index: number;
  key: string;
  librarySectionID: string;
  librarySectionKey: string;
  librarySectionTitle: string;
  originalTitle: string;
  originallyAvailableAt: Date;
  parentGuid: string;
  parentIndex: number;
  parentKey: string;
  parentRatingKey: string;
  parentTitle: string;
  ratingKey: string;
  sessionKey: string;
  summary: string;
  thumb: string;
  title: string;
  type: string;
  updatedAt: number;
  viewOffset: number;
  year: number;
  Media: Media[];
  User: User;
  Player: Player;
  Session: Session;
  TranscodeSession: TranscodeSession;
}

export interface Media {
  audioProfile: string;
  id: string;
  videoProfile: string;
  audioChannels: number;
  audioCodec: string;
  bitrate: number;
  container: string;
  duration: number;
  height: number;
  optimizedForStreaming: boolean;
  protocol: string;
  videoCodec: string;
  videoFrameRate: string;
  videoResolution: string;
  width: number;
  selected: boolean;
  Part: Part[];
}

export interface Part {
  audioProfile: string;
  id: string;
  videoProfile: string;
  bitrate: number;
  container: string;
  duration: number;
  height: number;
  optimizedForStreaming: boolean;
  protocol: string;
  width: number;
  decision: string;
  selected: boolean;
  Stream: Stream[];
}

export interface Stream {
  bitrate: number;
  codec: string;
  default: boolean;
  displayTitle: string;
  extendedDisplayTitle: string;
  frameRate?: number;
  height?: number;
  id: string;
  language: string;
  languageCode: string;
  languageTag: string;
  streamType: number;
  width?: number;
  decision: string;
  location: string;
  bitrateMode?: string;
  channels?: number;
  selected?: boolean;
  burn?: string;
  title?: string;
}

export interface Player {
  address: string;
  device: string;
  machineIdentifier: string;
  model: string;
  platform: string;
  platformVersion: string;
  product: string;
  profile: string;
  remotePublicAddress: string;
  state: string;
  title: string;
  version: string;
  local: boolean;
  relayed: boolean;
  secure: boolean;
  userID: number;
}

export interface Session {
  id: string;
  bandwidth: number;
  location: string;
}

export interface TranscodeSession {
  key: string;
  throttled: boolean;
  complete: boolean;
  progress: number;
  size: number;
  speed: number;
  error: boolean;
  duration: number;
  remaining: number;
  context: string;
  sourceVideoCodec: string;
  sourceAudioCodec: string;
  videoDecision: string;
  audioDecision: string;
  subtitleDecision: string;
  protocol: string;
  container: string;
  videoCodec: string;
  audioCodec: string;
  audioChannels: number;
  transcodeHwRequested: boolean;
  transcodeHwDecoding: string;
  transcodeHwEncoding: string;
  transcodeHwDecodingTitle: string;
  transcodeHwFullPipeline: boolean;
  transcodeHwEncodingTitle: string;
  timeStamp: number;
  maxOffsetAvailable: number;
  minOffsetAvailable: number;
}

export interface User {
  id: string;
  thumb: string;
  title: string;
}
/*

type WebhookPayload struct {
	Event    string                  `json:"event"`
	User     bool                    `json:"user"`
	Owner    bool                    `json:"owner"`
	Account  *Account                `json:"Account"`
	Server   *Server                 `json:"Server"`
	Player   *Player                 `json:"Player"`
	Metadata *WebhookPayloadMetadata `json:"Metadata"`
}

type WebhookPayloadMetadata struct {
	LibrarySectionType   string `json:"librarySectionType"`
	RatingKey            string `json:"ratingKey"`
	Key                  string `json:"key"`
	ParentRatingKey      string `json:"parentRatingKey"`
	GrandparentRatingKey string `json:"grandparentRatingKey"`
	GUID                 string `json:"guid"`
	LibrarySectionID     int64  `json:"librarySectionID"`
	Type                 string `json:"type"`
	Title                string `json:"title"`
	GrandparentKey       string `json:"grandparentKey"`
	ParentKey            string `json:"parentKey"`
	GrandparentTitle     string `json:"grandparentTitle"`
	ParentTitle          string `json:"parentTitle"`
	Summary              string `json:"summary"`
	Index                int64  `json:"index"`
	ParentIndex          int64  `json:"parentIndex"`
	RatingCount          int64  `json:"ratingCount"`
	Thumb                string `json:"thumb"`
	Art                  string `json:"art"`
	ParentThumb          string `json:"parentThumb"`
	GrandparentThumb     string `json:"grandparentThumb"`
	GrandparentArt       string `json:"grandparentArt"`
	AddedAt              int64  `json:"addedAt"`
	UpdatedAt            int64  `json:"updatedAt"`
}
*/
export interface WebhookPayload {
  event: string;
  user: boolean;
  owner: boolean;
  Account: Account;
  Server: Server;
  Player: Player;
  Metadata: WebhookPayloadMetadata;
}
export interface Account {
  id: string;
  thumb: string;
  title: string;
}
export interface Server {
  id: string;
  thumb: string;
  title: string;
}
export interface WebhookPayloadMetadata {
  librarySectionType: string;
  ratingKey: string;
  key: string;
  parentRatingKey: string;
  grandparentRatingKey: string;
  GUID: string;
  librarySectionID: number;
  type: string;
  title: string;
  grandparentKey: string;
  parentKey: string;
  grandparentTitle: string;
  parentTitle: string;
  summary: string;
  index: number;
  parentIndex: number;
  ratingCount: number;
  thumb: string;
  art: string;
  parentThumb: string;
  grandparentThumb: string;
  grandparentArt: string;
  addedAt: number;
  updatedAt: number;
}
