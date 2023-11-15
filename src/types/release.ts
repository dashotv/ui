export interface Release {
  id: string;
  name?: string;
  type?: string;
  source?: string;
  season?: string;
  episode?: string;
  group?: string;
  author?: string;
  verified?: boolean;
  nzb?: boolean;
  title?: string;
  raw?: string;
  description?: string;
  size?: string;
  view?: string;
  download?: string;
  infohash?: string;
  checksum?: string;
  tags?: string[];
  resolution?: number;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
}
