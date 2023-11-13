import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { NewDownloadBanner } from './NewDownloadBanner';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof NewDownloadBanner> = {
  title: 'Components/Banner',
  component: NewDownloadBanner,
};

export default meta;

type Story = StoryObj<typeof NewDownloadBanner>;

export const Download: Story = {
  args: {
    id: 'blarg',
    title: 'Eminence in Shadow',
    subtitle: '#5 blah blah blah',
    cover: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
    background: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
    status: 'loading',
    progress: '53',
    eta: new Date().toString(),
    queue: '1',
  },
  render: args => <NewDownloadBanner {...args} />,
};
