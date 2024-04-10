import React, { useCallback, useEffect, useState } from 'react';

import { Medium, Release } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import Paper from '@mui/material/Paper';

import { ButtonMap, ButtonMapButton, LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { ReleasesForm, ReleasesList, SearchForm, useRunicQuery } from 'components/Releases';
import { RunicResults, RunicSearch } from 'components/Runic';
import { useQueryString } from 'hooks/queryString';

// const pagesize = 25;

// const processSearch = (medium: Medium) => {
//   const { kind, search, display, episode_number, absolute_number } = medium;
//   const isAnimeKind = kind ? ['anime', 'ecchi', 'donghua'].includes(kind) : false;
//   if (!search) {
//     return { text: display, episode: episode_number };
//   }
//   if (!isAnimeKind || !search.includes(':') || !absolute_number || absolute_number === 0) {
//     return { text: search, episode: episode_number };
//   }
//
//   const s = search.split(':');
//   const text = s[0];
//   const minus = Number(s[1]) || 0;
//   return { text, episode: absolute_number - minus };
// };
//
// const formdata = (medium?: Medium): SearchForm => {
//   if (!medium) {
//     return {
//       text: '',
//       year: '',
//       season: '',
//       episode: '',
//       group: '',
//       author: '',
//       resolution: '',
//       source: '',
//       type: '',
//       exact: false,
//       verified: false,
//       uncensored: false,
//       bluray: false,
//     };
//   }
//   const { text, episode } = processSearch(medium);
//   const { kind, season_number, search_params } = medium;
//   const isAnimeKind = kind ? ['anime', 'ecchi', 'donghua'].includes(kind) : false;
//
//   return {
//     text: text || '',
//     year: '',
//     season: isAnimeKind ? '' : season_number || '',
//     episode: episode || '',
//     group: search_params?.group || '',
//     author: '',
//     resolution: search_params?.resolution || '',
//     source: search_params?.source || '',
//     type: search_params?.type || '',
//     exact: false,
//     verified: false,
//     uncensored: search_params?.uncensored || false,
//     bluray: search_params?.bluray || false,
//   };
// };

export function Runic({
  search,
  selector,
  selected,
}: {
  search?: Medium;
  selector: (url: string) => void;
  selected?: string;
}) {
  return (
    <WrapErrorBoundary>
      <RunicSearch {...{ search, selector, selected }} />
    </WrapErrorBoundary>
  );
}
