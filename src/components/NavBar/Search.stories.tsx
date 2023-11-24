import React from 'react';

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
    confirm: (option: Option | null) => {
      console.log('confirm: ', option);
    },
    data: {
      Media: {
        Results: [
          {
            ID: '6555cca73359bb335eff6010',
            Title: 'The Kingdoms of Ruin',
            Description: '',
            Type: 'series',
            Kind: 'anime',
            Date: '2023-10-07',
            Source: 'media',
            Image: 'http://localhost:3000/media-images/series-6555cca73359bb335eff6010/cover_thumb.jpg',
          },
          {
            ID: '62df23163359bbbfacf43484',
            Title: 'Kingdom (2012)',
            Description: '',
            Type: 'series',
            Kind: 'anime',
            Date: '2012-06-04',
            Source: 'media',
            Image: 'http://localhost:3000/media-images/series-62df23163359bbbfacf43484/cover_thumb.jpg',
          },
          {
            ID: '60ce8ee33359bb9dcf83bf11',
            Title: 'How a Realist Hero Rebuilt the Kingdom',
            Description: '',
            Type: 'series',
            Kind: 'anime',
            Date: '2021-07-04',
            Source: 'media',
            Image: 'http://localhost:3000/media-images/series-60ce8ee33359bb9dcf83bf11/cover_thumb.jpg',
          },
          {
            ID: '601a2b1c3359bb6005b6e92f',
            Title: 'The Last Kingdom',
            Description: '',
            Type: 'series',
            Kind: 'tv',
            Date: '2015-10-10',
            Source: 'media',
            Image: 'http://localhost:3000/media-images/series-601a2b1c3359bb6005b6e92f/cover_thumb.jpg',
          },
          {
            ID: '5a931d806b696d599d000000',
            Title: 'Jurassic World: Fallen Kingdom',
            Description: '',
            Type: 'movie',
            Kind: 'movies',
            Date: '2018-06-22',
            Source: 'media',
            Image: 'http://localhost:3000/media-images/movie-5a931d806b696d599d000000/cover_thumb.jpg',
          },
        ],
        Error: '',
      },
      Tmdb: {
        Results: [
          {
            ID: '708838',
            Title: 'Kingdom',
            Description:
              "A short film which center's on Jack, a young man caught between his family, his faith and his sexuality. As Jehovah's Witnesses Jack and his family are united in their devotion to their faith but as Jack's sexuality comes to light this revelation puts a strain on the family and their position with the local church leaving 16 year old Jack with an impossible decision to make.",
            Type: 'movie',
            Kind: 'movie',
            Date: '2018-10-17',
            Source: 'tmdb',
            Image: 'https://image.tmdb.org/t/p/original/orivGiJQA7HiCx4cFvhhIbtrd2y.jpg',
          },
          {
            ID: '1061181',
            Title: 'Kingdom 3: The Flame of Fate',
            Description:
              "It follows Li Xin and Wang Qi as they stand on the battlefield for the first time to fight off an invasion by Zhao, and it also follows Ying Zheng's unknown past.",
            Type: 'movie',
            Kind: 'movie',
            Date: '2023-07-28',
            Source: 'tmdb',
            Image: 'https://image.tmdb.org/t/p/original/lm5LF2eyCcBdCEfvpeyvpujOyPb.jpg',
          },
          {
            ID: '756005',
            Title: 'Kingdom',
            Description:
              "A vast, rocky desert. A lone woman struggles to preserve the last remaining bit of the last remaining glacier with a crazy patchwork of cloth and rags that she retrieves from the abandoned valleys. Sisyphus' work. Only at night, when the blazing sun has disappeared, other creatures appear. Wolves and mountain goats drink in unison from the last source of water. And the woman is no longer alone.",
            Type: 'movie',
            Kind: 'movie',
            Date: '2019-10-22',
            Source: 'tmdb',
            Image: 'https://image.tmdb.org/t/p/original/bk9R9WOX30ykiUKhdKavk3fZrzD.jpg',
          },
          {
            ID: '941810',
            Title: 'Kingdom',
            Description: 'Yorkshire-shot fantasy about talking dragons.',
            Type: 'movie',
            Kind: 'movie',
            Date: '2001-12-12',
            Source: 'tmdb',
            Image: 'https://image.tmdb.org/t/p/original/pNOvJDKWJMo0bTIIyRIYQVuNFND.jpg',
          },
          {
            ID: '609842',
            Title: 'Kingdom',
            Description: 'A lost man falls apart in a forest.',
            Type: 'movie',
            Kind: 'movie',
            Date: '2018-11-28',
            Source: 'tmdb',
            Image: 'https://image.tmdb.org/t/p/original/anzQ9U1WjF5MAZOPSsddTQZFwsv.jpg',
          },
        ],
        Error: '',
      },
      Tvdb: {
        Results: [
          {
            ID: '80201',
            Title: 'Kingdom',
            Description:
              'Peter Kingdom, a village solicitor who lives in a picturesque listed house in Norfolk and drives an Alvis, is looking after the sometimes bizarre legal needs of the locals. He is helped by a devoted secretary and an articling junior.  His needy sister lives with him, and his elderly aunt lives nearby.  To top it all, his brother Simon is missing and presumed dead, drowned in the North Sea.',
            Type: 'series',
            Kind: 'tv',
            Date: '2007-04-22',
            Source: 'tvdb',
            Image: 'https://artworks.thetvdb.com/banners/v4/series/80201/posters/609593f947ab4_t.jpg',
          },
          {
            ID: '355228',
            Title: 'Kingdom (2019)',
            Description:
              'While strange rumors about their ill king grip a kingdom, the crown prince becomes their only hope against a mysterious plague overtaking the land.',
            Type: 'series',
            Kind: 'tv',
            Date: '2019-01-25',
            Source: 'tvdb',
            Image: 'https://artworks.thetvdb.com/banners/posters/6420c6da5b624_t.jpg',
          },
          {
            ID: '259635',
            Title: 'Kingdom (2012)',
            Description:
              'In the Warring States Period of ancient China (475-221 BCE), Shin and Hyou are war-orphans in the kingdom of Qin. They dream of one day proving themselves on the battlefield. One day, however, Hyou is taken to the palace by a minister. Winding up on the losing side of a power-struggle, Hyou manages to return to the village, barely alive. Shin then meets a boy who closely resembles Hyou, Ei Sei. For now he is the king of Qin; later he will become the emperor Shi Huangdi.',
            Type: 'series',
            Kind: 'tv',
            Date: '2012-06-04',
            Source: 'tvdb',
            Image: 'https://artworks.thetvdb.com/banners/v4/series/259635/posters/625c568146674_t.jpg',
          },
          {
            ID: '436217',
            Title: 'Kingdom',
            Description:
              "A person named Haj Fatah Soltani becomes brain dead after an accident and goes to the realm of the world. At that time, an angel comes to him to deal with his sins.  On the other hand, Haj Fattah's son-in-law tries to reach Haj Fattah's wealth, but in fact, he fails in this way.",
            Type: 'series',
            Kind: 'tv',
            Date: '2010-06-01',
            Source: 'tvdb',
            Image: 'https://artworks.thetvdb.com/banners/v4/series/436217/posters/65217b63088f9_t.jpg',
          },
        ],
        Error: '',
      },
    },
  },
  render: args => <SuperSearchDialog {...args} />,
};
