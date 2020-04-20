import React from 'react';
import {useAsync} from "react-async"
import {stringify} from 'qs';

export type ReleaseSearch = {
    source?: string,
    type?: string,
    name?: string,
    year?: bigint,
    author?: string,
    group?: string,
    season?: bigint,
    episode?: bigint,
    resolution?: bigint,
    verified?: boolean,
    uncensored?: boolean,
    bluray?: boolean,
    exact?: boolean
}

export type MediaSearch = {
    type: string,
    name: string,
    display: string,
    title: string,
}

export const Releases = async (options: ReleaseSearch) => {
    const response = await fetch(`/api/scry/releases/?` + stringify(options));
    return response.json()
};

export const Media = async (options: MediaSearch) => {
    const response = await fetch("/api/scry/media?" + stringify(options))
    return response.json()
};
