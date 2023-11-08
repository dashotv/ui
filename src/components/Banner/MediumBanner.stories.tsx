// YourComponent.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';

import { MediumBanner } from './MediumBanner';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MediumBanner> = {
  title: 'Components/Banner',
  component: MediumBanner,
};

export default meta;

type Story = StoryObj<typeof MediumBanner>;

export const Medium: Story = {
  args: {
    id: 'blarg',
    medium: {
      id: 'blarg',
      type: 'Series',
      source: 'tvdb',
      source_id: 'blah',
      description: 'blah blah blah',
      cover: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/cover.jpg',
      background: 'http://localhost:3000/media-images/series-61b6f1383359bb870c54116a/background.jpg',
      title: 'Eminence in Shadow',
      name: 'Eminence in Shadow',
      display: '#5 blah blah blah',
      release_date: new Date('2022-10-05'),
      unwatched: 3,
      completed: false,
      favorite: false,
      broken: false,
      active: true,
    },
  },
  render: args => <MediumBanner {...args} />,
};
