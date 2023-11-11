import React from 'react';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import type { Meta, StoryObj } from '@storybook/react';

import { ButtonMap } from './ButtonMap';

const meta: Meta<typeof ButtonMap> = {
  component: ButtonMap,
};

export default meta;
type Story = StoryObj<typeof ButtonMap>;

const buttons = [
  {
    title: 'Click Me',
    icon: <DownloadForOfflineIcon color="primary" />,
    click: (ev: React.MouseEvent<HTMLElement>) => {
      console.log('click', ev);
    },
  },
  {
    title: 'Click Me',
    icon: <VisibilityOffIcon color="primary" />,
    click: (ev: React.MouseEvent<HTMLElement>) => {
      console.log('click', ev);
    },
  },
];

export const Medium: Story = {
  args: {
    buttons,
  },
  render: args => <ButtonMap {...args} />,
};

export const Small: Story = {
  args: {
    size: 'small',
    buttons,
  },
  render: args => <ButtonMap {...args} />,
};

export const Large: Story = {
  args: {
    size: 'large',
    buttons,
  },
  render: args => <ButtonMap {...args} />,
};
