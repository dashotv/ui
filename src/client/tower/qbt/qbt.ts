// TODO: implement interfaces/types for qbt
export interface qbt {
  // fields
}
/*
	Hash         string
	Status       int
	State        string
	Name         string
	Size         float64 // in bytes
	Progress     float64 // float64 in per mils
	Downloaded   float64 // in bytes
	Uploaded     float64 // in bytes
	Ratio        float64 // float64 in per mils
	UploadRate   float64 // float64 in bytes / second
	DownloadRate float64 // float64 in bytes / second
	Finish       float64 // float64 seconds
	Label        string
	//PeersConnected float64
	//PeersTotal     float64
	//SeedsConnected float64
	//SeedsTotal     float64
	//Availability   float64 // in 1/65535ths
	Queue float64
	//Remaining      float64 // in bytes
	Path  string
	Files []*TorrentFile
*/
export interface TorrentJSON {
  Hash: string;
  Status: number;
  State: string;
  Name: string;
  Size: number;
  Progress: string;
  Downloaded: number;
  Uploaded: number;
  Ratio: number;
  UploadRate: number;
  DownloadRate: number;
  Finish: number;
  Label: string;
  Queue: number;
  Path: string;
  Files: TorrentFile[];
}
export interface TorrentFile {
  id: number;
  name: string;
  size: number;
  progress: number;
  priority: number;
  // isSeed: boolean;
}
