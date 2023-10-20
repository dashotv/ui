export interface TvdbResponse {
    tvdb: TvdbResult[];
}

export interface TvdbResult {
    id: number;
    name: string;
    overview: string;
    first_air_time: string;
    runtime: number;
    network: string;
    genre: string[];
    status: string;
    poster: string;
    posterShape: string;
    banner: string;
    bannerShape: string;
    fanart: string;
    fanartShape: string;
    imdbId: string;
    tvdbId: number;
    tvrageId: number;
    lastUpdated: number;
}
