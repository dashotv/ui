import React from 'react';

import { Medium } from 'client/tower';

import Grid from '@mui/material/Grid';

import type { Meta, StoryObj } from '@storybook/react';

import { DownloadBanner } from './Banner';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof DownloadBanner> = {
  component: DownloadBanner,
  args: {
    id: 'blarg',
    download: {
      title: 'Eminence in Shadow',
      display: '#5 blah blah blah',
      cover: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
      background: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
      status: 'loading',
      progress: 43.7,
      eta: new Date().toString(),
      queue: 1,
    },
    nav: (_m?: Medium) => {},
    changeSetting: (_s: string, _v: boolean | string) => {},
  },
};

export default meta;

type Story = StoryObj<typeof DownloadBanner>;

export const DownloadSmall: Story = {
  render: args => {
    return (
      <Grid container>
        <Grid item md={4} xs={12}>
          <DownloadBanner {...args} />
        </Grid>
      </Grid>
    );
  },
};

export const DownloadState: Story = {
  render: args => {
    return (
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <DownloadBanner {...args} />
        </Grid>
        <Grid item md={4} xs={12}>
          <DownloadBanner {...args} />
        </Grid>
        <Grid item md={4} xs={12}>
          <DownloadBanner {...args} />
        </Grid>
      </Grid>
    );
  },
};

export const DownloadLarge: Story = {
  render: args => <DownloadBanner {...args} />,
};

// export const DownloadMulti: Story = {
//   render: args => {
//     args.multi = true;
//     args.files = 19;
//     args.total = 48;
//     return (
//       <Grid container>
//         <Grid item width="400px">
//           <DownloadBanner {...args} />
//         </Grid>
//       </Grid>
//     );
//   },
// };
