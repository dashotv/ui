export interface TmdbResponse {
    tmdb: TmdbResult[];
}

export interface TmdbResult {
    id: number;
    media_type: string;
    name: string;
    title: string;
    overview: string;
    first_aired: string;
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
    release_date: string;
}
