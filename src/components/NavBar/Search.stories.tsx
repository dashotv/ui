import type { Meta, StoryObj } from '@storybook/react';

import { Option } from 'query/option';

import { SuperSearchConfirm } from './Search';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SuperSearchConfirm> = {
  title: 'Components/Navbar/Confirm',
  component: SuperSearchConfirm,
};

export default meta;

type Story = StoryObj<typeof SuperSearchConfirm>;

export const Series: Story = {
  args: {
    open: true,
    confirm: (option: Option | null) => {
      console.log('confirm: ', option);
    },
    option: {
      ID: 'blarg',
      Type: 'series',
      Title: 'Frieren: Beyond Journey’s End',
      Description:
        'After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude. Generations pass, and the elven mage Frieren comes face to face with humanity’s mortality. She takes on a new apprentice and promises to fulfill old friends’ dying wishes. Can an elven mind make peace with the nature of life and death? Frieren embarks on her quest to find out.',
      Date: '2023-10-05',
      Source: 'tvdb',
    },
  },
};
export const Movie: Story = {
  args: {
    open: true,
    confirm: (option: Option | null) => {
      console.log('confirm: ', option);
    },
    option: {
      ID: 'blarg',
      Type: 'movie',
      Title: 'The Marvels',
      Description:
        'Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But unintended consequences see Carol shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole linked to a Kree revolutionary, her powers become entangled with that of Jersey City super-fan Kamala Khan, aka Ms. Marvel, and Carol’s estranged niece, now S.A.B.E.R. astronaut Captain Monica Rambeau. Together, this unlikely trio must team up and learn to work in concert to save the universe.',
      Date: '2023-11-08',
      Source: 'tmdb',
    },
  },
};
