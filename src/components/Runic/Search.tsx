import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Medium, Release } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { ButtonMap, ButtonMapButton, LoadingIndicator } from 'components/Common';
import { IconCheckbox, Select, Text } from 'components/Form';
import { useRunicQuery } from 'components/Releases';
import { useQueryString } from 'hooks/queryString';
import { ReleaseSources, ReleaseTypes, Resolutions } from 'types/constants';

import { RunicResults } from './Results';
import { RunicForm } from './types';

const pagesize = 25;
const formData = (medium?: Medium): RunicForm => {
  if (!medium) {
    return {
      text: '',
      year: '',
      season: '',
      episode: '',
      group: '',
      website: '',
      resolution: '',
      source: '',
      type: '',
      exact: false,
      verified: false,
      uncensored: false,
      bluray: false,
    };
  }

  return {
    text: medium.search || '',
    year: '',
    season: medium.season_number || '',
    episode: medium.episode_number || '',
    group: '',
    website: medium.search_params?.group || '',
    resolution: medium.search_params?.resolution || '',
    source: medium.search_params?.source || '',
    type: medium.search_params?.type || '',
    exact: false,
    verified: false,
    uncensored: false,
    bluray: false,
  };
};

export interface RunicSearchProps {
  selector: (url: string) => void;
  selected?: { url?: string; release_id?: string };
  medium?: Medium;
}

export const RunicSearch = ({ medium, selector, selected }: RunicSearchProps) => {
  const [rawForm] = useState<RunicForm>(formData(medium));
  const [form, setForm] = useState<RunicForm>(rawForm);
  const [defaultForm] = useState<RunicForm>(rawForm);
  const { handleSubmit, control } = useForm<RunicForm>({ values: form });
  const { queryString } = useQueryString();

  const { data, isFetching } = useRunicQuery(1, pagesize, queryString(form));

  const reset = () => {
    setForm(defaultForm);
  };
  const submit = (data: RunicForm) => {
    setForm(data);
  };
  const handleSelect = (row: Release) => {
    if (!row.download) {
      return;
    }
    selector(row.download);
  };

  const actions = row => {
    const buttons: ButtonMapButton[] = [
      {
        Icon: OutboundRoundedIcon,
        color: 'primary',
        click: () => console.log('click'),
        title: 'edit',
      },
      {
        Icon: CheckCircleIcon,
        color: 'primary',
        click: () => handleSelect(row),
        title: 're-process',
      },
    ];
    return <ButtonMap buttons={buttons} size="small" />;
  };

  return (
    <>
      <Paper elevation={1} sx={{ p: 2, mb: 2, width: '100%' }}>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Text sx={{ minWidth: '125px' }} name="text" label="search" control={control} />
            <Text name="year" control={control} />
            <Text name="season" control={control} />
            <Text name="episode" control={control} />
            <Text name="group" control={control} />
            <Text name="website" control={control} />
            <Select name="resolution" label="Rez" control={control} options={Resolutions} />
            <Select name="source" control={control} options={ReleaseSources} />
            <Select name="type" control={control} options={ReleaseTypes} />
            <Stack sx={{ pt: 1, pl: 2 }} direction="row" spacing={1}>
              <IconCheckbox
                name="exact"
                sx={{ mr: 0 }}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CrisisAlertIcon />}
                control={control}
              />
              <IconCheckbox
                name="verified"
                sx={{ mr: 0 }}
                icon={<VerifiedOutlinedIcon />}
                checkedIcon={<VerifiedIcon />}
                control={control}
              />
              <IconCheckbox
                name="bluray"
                sx={{ mr: 0 }}
                icon={<VideocamOutlinedIcon />}
                checkedIcon={<VideocamIcon />}
                control={control}
              />
              <IconCheckbox
                name="uncensored"
                sx={{ mr: 0 }}
                icon={<SportsBarOutlinedIcon />}
                checkedIcon={<SportsBarIcon />}
                control={control}
              />
              <Button variant="contained" type="submit">
                Go
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  reset && reset();
                }}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
      {isFetching ? <LoadingIndicator /> : null}
      {data?.Releases ? <RunicResults data={data?.Releases} actions={actions} selected={undefined} /> : null}
    </>
  );
};
