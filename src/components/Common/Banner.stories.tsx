import React from 'react';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import type { Meta, StoryObj } from '@storybook/react';

import { Banner } from './Banner';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Banner> = {
  component: Banner,
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    id: 'blarg',
    title: 'Title',
    extra: 'extra',
    subtitle: 'subtitle',
    tertiary: 'tertiary',
    images: [
      'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
      'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
    ],
  },
  render: args => <Banner {...args} />,
};

export const Actions: Story = {
  args: {
    id: 'blarg',
    title: 'Title',
    extra: 'extra',
    subtitle: 'subtitle',
    tertiary: 'tertiary',
    images: [
      'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
      'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
    ],
    unwatched: 3,
    flags: { active: true, completed: false, favorite: true },
    buttons: [
      {
        Icon: DownloadForOfflineIcon,
        color: 'primary',
        click: () => {},
        title: 'create download',
      },
      {
        Icon: ReplayCircleFilledIcon,
        color: 'primary',
        title: 'refresh',
      },
    ],
  },
  render: args => <Banner {...args} />,
};
