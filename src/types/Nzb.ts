export interface NzbResponse {
  Status: NzbResponseStatus;
}

export interface NzbResponseStatus {
  DownloadRate: number;
  FreeDiskSpaceMB: number;
}
