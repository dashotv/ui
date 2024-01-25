import React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarsIcon from '@mui/icons-material/Stars';
import { Stack } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/react';

import { ButtonMapButton } from 'components/Common';

import { CoverRow } from './CoverRow';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CoverRow> = {
  title: 'Components/Common/Cover/Row',
  component: CoverRow,
};

export default meta;

type Story = StoryObj<typeof CoverRow>;

const buttons: ButtonMapButton[] = [
  {
    Icon: CloudCircleIcon,
    color: 'primary',
    click: () => console.log('click'),
    title: 'create download',
  },
  {
    Icon: ReplayCircleFilledIcon,
    color: 'primary',
    click: () => console.log('click'),
    title: 'refresh',
  },
  {
    Icon: BuildCircleIcon,
    color: 'disabled',
    click: () => console.log('click'),
    title: 'broken',
  },
  {
    Icon: RecommendIcon,
    color: 'disabled',
    click: () => console.log('click'),
    title: 'favorite',
  },
  {
    Icon: StarsIcon,
    color: 'action',
    click: () => console.log('click'),
    title: 'active',
  },
];

export const Default: Story = {
  args: {
    title: 'The Eminence in Shadow',
    subtitle: '#003 the blarg of blarg',
    kind: 'anime',
    source: 'tvdb',
    source_id: '123456789',
    count: 3,
    description: `Shadowbrokers are those who go unnoticed, posing as unremarkable people, when in
    truth, they control everything from behind the scenes. Sid wants to be someone just like that
    more than anything, and something as insignificant as boring reality isn't going to get in his
    way! He trains in secret every single night, preparing for his eventual rise to power—only to
    denied his destiny by a run-of-the-mill (yet deadly) traffic accident. But when he wakes up in
    a another world and suddenly finds himself at the head of an actual secret organization doing
    battle with evil in the shadows, he'll finally get a chance to act out all of his delusional
    fantasies!`,
    image: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
    buttons: buttons,
    // images: [
    //   '/blarg.png',
    //   'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
    //   'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
    // ],
  },
  render: args => (
    <Stack direction="column" spacing={1}>
      <CoverRow {...args} />
      <CoverRow {...args} progress={33.3} />
      <CoverRow {...args} progress={33.3} files={12} completed={4} />
      <CoverRow
        {...args}
        title="Madame Web"
        source="tmdb"
        kind="movie"
        source_id="987654321"
        subtitle="2024"
        description="Madame Web blah blah blah"
        image="http://localhost:3000/media-images/movie-65ab6bb902439b7b26365f88/background.jpg"
        count={undefined}
      />
      <CoverRow
        {...args}
        title="Madame Web"
        source="tmdb"
        kind="movie"
        source_id="987654321"
        subtitle="2024"
        description="Madame Web blah blah blah"
        image="http://localhost:3000/media-images/movie-65ab6bb902439b7b26365f88/background.jpg"
        count={undefined}
        progress={33.3}
      />
      <CoverRow
        {...args}
        title="Madame Web"
        source="tmdb"
        kind="movie"
        source_id="987654321"
        subtitle="2024"
        description="Madame Web blah blah blah"
        image="http://localhost:3000/media-images/movie-65ab6bb902439b7b26365f88/background.jpg"
        count={undefined}
        progress={33.3}
        files={2}
        completed={1}
      />
    </Stack>
  ),
};
