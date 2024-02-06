export interface Child {
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

/*
    "name": "SHIELD Android TV",
    "product": "Plex for Android (TV)",
    "productVersion": "10.8.0.5554",
    "platform": "Android",
    "platformVersion": "11",
    "device": "SHIELD Android TV",
    "clientIdentifier": "972291a8b1cb9552-com-plexapp-android",
    */
export interface PlexPlayer {
  name: string;
  product: string;
  productVersion: string;
  platform: string;
  platformVersion: string;
  device: string;
  clientIdentifier: string;
}
