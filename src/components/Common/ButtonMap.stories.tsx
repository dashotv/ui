import React from 'react';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import type { Meta, StoryObj } from '@storybook/react';

import { ButtonMap } from './ButtonMap';

const meta: Meta<typeof ButtonMap> = {
  component: ButtonMap,
  args: {
    buttons: [
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
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ButtonMap>;

export const Medium: Story = {
  render: args => <ButtonMap {...args} />,
};

export const Small: Story = {
  render: args => <ButtonMap {...args} size="small" />,
};

export const Large: Story = {
  render: args => <ButtonMap {...args} size="large" />,
};
