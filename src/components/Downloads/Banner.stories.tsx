import React from 'react';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import Grid2 from '@mui/material/Grid';

import type { Meta, StoryObj } from '@storybook/react';

import { DownloadBanner } from './Banner';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DownloadBanner> = {
  component: DownloadBanner,
  args: {
    id: 'blarg',
    title: 'Eminence in Shadow',
    subtitle: '#5 blah blah blah',
    cover: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
    background: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
    status: 'loading',
    progress: '43.7',
    eta: new Date().toString(),
    queue: '1',
    progressBar: true,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['searching', 'loading', 'managing', 'reviewing', 'downloading', 'done', 'paused', 'deleted', 'held'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof DownloadBanner>;

const buttons = [
  {
    icon: <ArrowCircleLeftIcon color="primary" />,
    // click: <Link to={`/${props.download?.media?.type}/${props.download?.media?.id}`} />,
    title: 'Go to Media',
  },
  {
    icon: <CheckCircleIcon color="primary" />,
    title: 'mark complete',
  },
  {
    icon: <ChangeCircleIcon color="primary" />,
    title: 'reset',
  },
  {
    icon: <OfflineBoltIcon color={'secondary'} />,
    click: ev => {
      ev.preventDefault(); // for the buttons inside the Link component
    },
    title: 'toggle auto',
  },
  {
    icon: <PlaylistAddCheckCircleIcon color={'action'} />,
    click: ev => {
      ev.preventDefault(); // for the buttons inside the Link component
    },
    title: 'toggle multi',
  },
  {
    icon: <SwapHorizontalCircleIcon color={'action'} />,
    click: ev => {
      ev.preventDefault(); // for the buttons inside the Link component
    },
    title: 'toggle force',
  },
  {
    icon: <CancelIcon color="error" />,
    title: 'delete',
  },
];

export const DownloadSmall: Story = {
  render: args => {
    return (
      <Grid2 container>
        <Grid2 item md={4} xs={12}>
          <DownloadBanner {...args} />
        </Grid2>
      </Grid2>
    );
  },
};

export const DownloadLarge: Story = {
  render: args => <DownloadBanner {...args} buttons={buttons} statusAction={() => {}} />,
};

export const DownloadMulti: Story = {
  render: args => {
    args.progressBar = true;
    args.multi = true;
    args.files = 19;
    args.total = 26;
    return (
      <Grid2 container>
        <Grid2 item md={4} xs={12}>
          <DownloadBanner {...args} />
        </Grid2>
      </Grid2>
    );
  },
};
