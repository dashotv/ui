// TODO: implement interfaces/types for nzbget
export interface nzbget {
  // fields
}
export interface StatusResponse {
  Result: Status;
}
export interface Status {
  RemainingSizeMB: number;
  ForcedSizeMB: number;
  DownloadedSizeMB: number;
  MonthSizeMB: number;
  DaySizeMB: number;
  ArticleCacheMB: number;
  DownloadRate: number;
  AverageDownloadRate: number;
  DownloadLimit: number;
  UpTimeSec: number;
  DownloadTimeSec: number;
  ServerPaused: boolean;
  DownloadPaused: boolean;
  Download2Paused: boolean;
  ServerStandBy: boolean;
  PostPaused: boolean;
  ScanPaused: boolean;
  QuotaReached: boolean;
  FreeDiskSpaceMB: number;
  ServerTime: number;
  ResumeTime: number;
  FeedActive: boolean;
  QueueScriptCount: number;
  NewsServers: NewsServer[];
}
export interface NewsServer {
  ID: number;
  Active: boolean;
}

export interface Group {
  ID: number;
  RemainingSizeMB: number;
  PausedSizeMB: number;
  RemainingFileCount: number;
  RemainingParCount: number;
  MinPriority: number;
  MaxPriority: number;
  ActiveDownloads: number;
  Status: string;
  NZBName: string;
  NZBNicename: string;
  Kind: string;
  URL: string;
  NZBFilename: string;
  DestDir: string;
  FinalDir: string;
  Category: string;
  ParStatus: string;
  ExParStatus: string;
  UnpackStatus: string;
  MoveStatus: string;
  ScriptStatus: string;
  DeleteStatus: string;
  MarkStatus: string;
  UrlStatus: string;
  FileSizeMB: number;
  FileCount: number;
  MinPostTime: number;
  MaxPostTime: number;
  TotalArticles: number;
  SuccessArticles: number;
  FailedArticles: number;
  Health: number;
  CriticalHealth: number;
  DupeKey: string;
  DupeScore: number;
  DupeMode: string;
  Deleted: boolean;
  DownloadedSizeMB: number;
  DownloadTimeSec: number;
  PostTotalTimeSec: number;
  ParTimeSec: number;
  RepairTimeSec: number;
  UnpackTimeSec: number;
  MessageCount: number;
  ExtraParBlocks: number;
  Parameters: Parameter[];
  ScriptStatuses: ScriptStatus[];
  ServerStats: ServerStat[];
  PostInfoText: string;
  PostStageProgress: number;
  PostStageTimeSec: number;
  Log: Log[];
}
export interface Parameter {
  Name: string;
  Value: string;
}
export interface ScriptStatus {
  Name: string;
  Status: string;
}
export interface Log {}
export interface GroupResponse {
  Result: Group[];
}
export interface ServerStat {
  ServerID: number;
  SuccessArticles: number;
  FailedArticles: number;
}
