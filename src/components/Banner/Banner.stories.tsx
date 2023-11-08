// YourComponent.stories.ts|tsx
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
    title: 'Eminence in Shadow',
    // subtitle: '#5 blah blah blah',
    release_date: '2022-10-05',
    background: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
    cover: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
    active: true,
    unwatched: 3,
  },
  render: args => <Banner {...args} />,
};
