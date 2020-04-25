import {stringify} from 'qs';

export type ScryReleaseOptions = {
    source?: string,
    type?: string,
    text?: string,
    year?: number,
    author?: string,
    group?: string,
    season?: number,
    episode?: number,
    resolution?: number,
    verified?: boolean,
    uncensored?: boolean,
    bluray?: boolean,
    exact?: boolean
}

export type MediaSearch = {
    type?: string,
    name?: string,
    display?: string,
    title?: string,
}

export const Releases = async (options: ScryReleaseOptions) => {
    const response = await fetch(`/api/scry/releases/?` + stringify(options));
    return response.json()
};

export const Media = async (options: MediaSearch) => {
    const response = await fetch("/api/scry/media/?" + stringify(options))
    return response.json()
};

export const Upcoming = async () => {
    const options = {
        type: "episode",
    }
    return Media(options)
}
