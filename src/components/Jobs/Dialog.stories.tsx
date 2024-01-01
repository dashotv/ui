import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { JobsDialog } from './Dialog';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof JobsDialog> = {
  component: JobsDialog,
};

export default meta;

type Story = StoryObj<typeof JobsDialog>;

export const Default: Story = {
  args: {
    job: {
      id: '134qrer135',
      kind: 'Important',
      status: 'completed',
      queue: 'default',
      args: '{}',
      attempts: [
        {
          started_at: new Date(),
          duration: 34,
          error: 'holy shit fuck, it messed up',
          status: 'failed',
          stacktrace: ['oops.go:32', 'totally_fucked.go:28'],
        },
        {
          started_at: new Date(),
          duration: 34,
          error: '',
          status: 'completed',
          stacktrace: [],
        },
      ],
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
  render: args => <JobsDialog {...args} />,
};
