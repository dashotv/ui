import React from 'react';

import Stack from '@mui/material/Stack';

import type { Meta, StoryObj } from '@storybook/react';

import './Navbar.scss';
import { Notice } from './Notice';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Notice> = {
  title: 'Components/Navbar',
};

export default meta;

type Story = StoryObj<typeof Notice>;

export const Alert: Story = {
  args: {
    key: 'blarg',
    data: {
      event: 'notice',
      time: '2021-10-20T20:00:00Z',
      class: 'Notice',
      message: 'This is a notice',
      level: 'info',
    },
  },
  render: args => (
    <Stack direction="column" spacing={3}>
      <Notice {...args} data={{ ...args.data, level: 'info' }} />
      <Notice {...args} data={{ ...args.data, level: 'warning' }} />
      <Notice {...args} data={{ ...args.data, level: 'error' }} />
      <Notice {...args} data={{ ...args.data, level: 'success' }} />
    </Stack>
  ),
};
