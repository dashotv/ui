import React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarsIcon from '@mui/icons-material/Stars';

import type { Meta, StoryObj } from '@storybook/react';

import { MediumBanner } from './Banner';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MediumBanner> = {
  component: MediumBanner,
  args: {
    id: 'blarg',
    medium: {
      id: 'blarg',
      type: 'Episode',
      source: 'tvdb',
      source_id: 'blah',
      description: 'blah blah blah',
      cover: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
      background: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
      title: 'Eminence in Shadow',
      name: 'Eminence in Shadow',
      display: '#5 blah blah blah',
      search: 'eminence in shadow s2:25',
      release_date: new Date('2022-10-05').toString(),
      unwatched: 3,
      completed: false,
      favorite: false,
      broken: false,
      active: true,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    },
  },
};

export default meta;

type Story = StoryObj<typeof MediumBanner>;

export const MediumSmall: Story = {
  args: {},
  render: args => <MediumBanner {...args} />,
};

const complete = ev => {
  console.log('clicked complete');
  ev.preventDefault(); // for the buttons inside the Link component
};
const buttons = [
  {
    icon: <DownloadForOfflineIcon color="primary" />,
    click: complete,
    title: 'create download',
  },
  {
    icon: <ReplayCircleFilledIcon color="primary" />,
    click: complete,
    title: 'refresh',
  },
  {
    icon: <BuildCircleIcon color={'secondary'} />,
    click: complete,
    title: 'broken',
  },
  {
    icon: <CheckCircleIcon color="action" />,
    click: complete,
    title: 'completed',
  },
  {
    icon: <RecommendIcon color="action" />,
    click: complete,
    title: 'favorite',
  },
  {
    icon: <StarsIcon color="action" />,
    click: complete,
    title: 'active',
  },
  {
    icon: <RemoveCircleIcon color="error" />,
    click: complete,
    title: 'delete',
  },
];
export const MediumSeries: Story = {
  render: args => <MediumBanner {...args} buttons={buttons} />,
};
