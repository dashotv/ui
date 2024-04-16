import React from 'react';

import { SearchResult } from 'client/scry';

import type { Meta, StoryObj } from '@storybook/react';

import { Option } from 'components/Media/types';

import './Navbar.scss';
import { SuperSearchDialog } from './Search';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SuperSearchDialog> = {
  title: 'Components/Navbar/Search',
  component: SuperSearchDialog,
};

export default meta;

type Story = StoryObj<typeof SuperSearchDialog>;

export const Search: Story = {
  args: {
    open: true,
    confirm: (option: SearchResult | null) => {
      console.log('confirm: ', option);
    },
    data: {
      media: {
        results: [
          {
            id: '6555cca73359bb335eff6010',
            title: 'The Kingdoms of Ruin',
            description: '',
            type: 'series',
            kind: 'anime',
            date: '2023-10-07',
            source: 'media',
            image: 'http://localhost:3000/media-images/series-6555cca73359bb335eff6010/cover_thumb.jpg',
          },
          {
            id: '62df23163359bbbfacf43484',
            title: 'Kingdom (2012)',
            description: '',
            type: 'series',
            kind: 'anime',
            date: '2012-06-04',
            source: 'media',
            image: 'http://localhost:3000/media-images/series-62df23163359bbbfacf43484/cover_thumb.jpg',
          },
          {
            id: '60ce8ee33359bb9dcf83bf11',
            title: 'How a Realist Hero Rebuilt the Kingdom',
            description: '',
            type: 'series',
            kind: 'anime',
            date: '2021-07-04',
            source: 'media',
            image: 'http://localhost:3000/media-images/series-60ce8ee33359bb9dcf83bf11/cover_thumb.jpg',
          },
          {
            id: '601a2b1c3359bb6005b6e92f',
            title: 'The Last Kingdom',
            description: '',
            type: 'series',
            kind: 'tv',
            date: '2015-10-10',
            source: 'media',
            image: 'http://localhost:3000/media-images/series-601a2b1c3359bb6005b6e92f/cover_thumb.jpg',
          },
          {
            id: '5a931d806b696d599d000000',
            title: 'Jurassic World: Fallen Kingdom',
            description: '',
            type: 'movie',
            kind: 'movies',
            date: '2018-06-22',
            source: 'media',
            image: 'http://localhost:3000/media-images/movie-5a931d806b696d599d000000/cover_thumb.jpg',
          },
          {
            id: '6555cca73359bb335eff6010',
            title: 'The Kingdoms of Ruin',
            description: '',
            type: 'series',
            kind: 'anime',
            date: '2023-10-07',
            source: 'media',
            image: 'http://localhost:3000/media-images/series-6555cca73359bb335eff6010/cover_thumb.jpg',
          },
          {
            id: '62df23163359bbbfacf43484',
            title: 'Kingdom (2012)',
            description: '',
            type: 'series',
            kind: 'anime',
            date: '2012-06-04',
            source: 'media',
            image: 'http://localhost:3000/media-images/series-62df23163359bbbfacf43484/cover_thumb.jpg',
          },
        ],
        error: '',
      },
      tmdb: {
        results: [
          {
            id: '708838',
            title: 'Kingdom',
            description:
              "A short film which center's on Jack, a young man caught between his family, his faith and his sexuality. As Jehovah's Witnesses Jack and his family are united in their devotion to their faith but as Jack's sexuality comes to light this revelation puts a strain on the family and their position with the local church leaving 16 year old Jack with an impossible decision to make.",
            type: 'movie',
            kind: 'movie',
            date: '2018-10-17',
            source: 'tmdb',
            image: 'https://image.tmdb.org/t/p/original/orivGiJQA7HiCx4cFvhhIbtrd2y.jpg',
          },
          {
            id: '1061181',
            title: 'Kingdom 3: The Flame of Fate',
            description:
              "It follows Li Xin and Wang Qi as they stand on the battlefield for the first time to fight off an invasion by Zhao, and it also follows Ying Zheng's unknown past.",
            type: 'movie',
            kind: 'movie',
            date: '2023-07-28',
            source: 'tmdb',
            image: 'https://image.tmdb.org/t/p/original/lm5LF2eyCcBdCEfvpeyvpujOyPb.jpg',
          },
          {
            id: '756005',
            title: 'Kingdom',
            description:
              "A vast, rocky desert. A lone woman struggles to preserve the last remaining bit of the last remaining glacier with a crazy patchwork of cloth and rags that she retrieves from the abandoned valleys. Sisyphus' work. Only at night, when the blazing sun has disappeared, other creatures appear. Wolves and mountain goats drink in unison from the last source of water. And the woman is no longer alone.",
            type: 'movie',
            kind: 'movie',
            date: '2019-10-22',
            source: 'tmdb',
            image: 'https://image.tmdb.org/t/p/original/bk9R9WOX30ykiUKhdKavk3fZrzD.jpg',
          },
          {
            id: '941810',
            title: 'Kingdom',
            description: 'Yorkshire-shot fantasy about talking dragons.',
            type: 'movie',
            kind: 'movie',
            date: '2001-12-12',
            source: 'tmdb',
            image: 'https://image.tmdb.org/t/p/original/pNOvJDKWJMo0bTIIyRIYQVuNFND.jpg',
          },
          {
            id: '609842',
            title: 'Kingdom',
            description: 'A lost man falls apart in a forest.',
            type: 'movie',
            kind: 'movie',
            date: '2018-11-28',
            source: 'tmdb',
            image: 'https://image.tmdb.org/t/p/original/anzQ9U1WjF5MAZOPSsddTQZFwsv.jpg',
          },
        ],
        error: '',
      },
      tvdb: {
        results: [
          {
            id: '80201',
            title: 'Kingdom',
            description:
              'Peter Kingdom, a village solicitor who lives in a picturesque listed house in Norfolk and drives an Alvis, is looking after the sometimes bizarre legal needs of the locals. He is helped by a devoted secretary and an articling junior.  His needy sister lives with him, and his elderly aunt lives nearby.  To top it all, his brother Simon is missing and presumed dead, drowned in the North Sea.',
            type: 'series',
            kind: 'tv',
            date: '2007-04-22',
            source: 'tvdb',
            image: 'https://artworks.thetvdb.com/banners/v4/series/80201/posters/609593f947ab4_t.jpg',
          },
          {
            id: '355228',
            title: 'Kingdom (2019)',
            description:
              'While strange rumors about their ill king grip a kingdom, the crown prince becomes their only hope against a mysterious plague overtaking the land.',
            type: 'series',
            kind: 'tv',
            date: '2019-01-25',
            source: 'tvdb',
            image: 'https://artworks.thetvdb.com/banners/posters/6420c6da5b624_t.jpg',
          },
          {
            id: '259635',
            title: 'Kingdom (2012)',
            description:
              'In the Warring States Period of ancient China (475-221 BCE), Shin and Hyou are war-orphans in the kingdom of Qin. They dream of one day proving themselves on the battlefield. One day, however, Hyou is taken to the palace by a minister. Winding up on the losing side of a power-struggle, Hyou manages to return to the village, barely alive. Shin then meets a boy who closely resembles Hyou, Ei Sei. For now he is the king of Qin; later he will become the emperor Shi Huangdi.',
            type: 'series',
            kind: 'tv',
            date: '2012-06-04',
            source: 'tvdb',
            image: 'https://artworks.thetvdb.com/banners/v4/series/259635/posters/625c568146674_t.jpg',
          },
          {
            id: '436217',
            title: 'Kingdom',
            description:
              "A person named Haj Fatah Soltani becomes brain dead after an accident and goes to the realm of the world. At that time, an angel comes to him to deal with his sins.  On the other hand, Haj Fattah's son-in-law tries to reach Haj Fattah's wealth, but in fact, he fails in this way.",
            type: 'series',
            kind: 'tv',
            date: '2010-06-01',
            source: 'tvdb',
            image: 'https://artworks.thetvdb.com/banners/v4/series/436217/posters/65217b63088f9_t.jpg',
          },
        ],
        error: '',
      },
    },
  },
  render: args => <SuperSearchDialog {...args} />,
};
