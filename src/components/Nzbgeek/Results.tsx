import React from 'react';

import ArticleIcon from '@mui/icons-material/Article';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Megabytes, Published, ResolutionTitle } from 'components/Common';

import { Nzbgeek as NzbgeekType } from './types';

export type NzbgeekResultsProps = {
  data: NzbgeekType[];
  actions: (row: NzbgeekType) => React.ReactNode;
  selected?: { release_id?: string; url?: string };
};
export function NzbgeekResults({ data, actions, selected }: NzbgeekResultsProps) {
  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {data && data.map((row, index) => <NzbgeekResultsRow key={index} {...{ row, actions, selected }} />)}
    </Paper>
  );
}

export type NzbgeekResultsRowProps = {
  row: NzbgeekType;
  actions: (row: NzbgeekType) => React.ReactNode;
  selected?: { release_id?: string; url?: string };
};
export function NzbgeekResultsRow({
  row,
  row: {
    guid,
    pubDate: published,
    title,
    enclosure: { '@attributes': attributes },
  },
  actions,
  selected,
}: NzbgeekResultsRowProps) {
  const isSelected = (row: NzbgeekType) => {
    if (!selected) {
      return false;
    }
    return row.link === selected.url;
  };
  return (
    <Paper
      key={guid}
      elevation={1}
      sx={{ mb: 1, width: '100%', backgroundColor: isSelected(row) ? '#222266' : 'inherit' }}
    >
      <Stack
        sx={{ pr: 1, pl: 1 }}
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack width="100%" direction="row" spacing={1} alignItems="center" maxWidth={{ xs: '100%', md: '900px' }}>
          <ArticleIcon fontSize="small" />
          <Typography title={title} fontWeight="bolder" color="primary" noWrap>
            {title}
          </Typography>
          <ResolutionTitle title={title} />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', justifyContent: 'end' }}>
          {attributes && attributes.length && <Megabytes value={Number(attributes.length)} ord="bytes" />}
          {published && <Published date={published} />}
          {actions(row)}
        </Stack>
      </Stack>
    </Paper>
  );
}
