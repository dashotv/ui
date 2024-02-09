import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PlexPlayerView } from './Player';
import { PlexSession } from './types';

const queryClient = new QueryClient();
//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof PlexPlayerView> = {
  component: PlexPlayerView,
  decorators: [Story => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>],
};

export default meta;

type Story = StoryObj<typeof PlexPlayerView>;

const sessions: PlexSession[] = [
  {
    addedAt: 1671846347,
    art: '/library/metadata/214524/art/1707144285',
    contentRating: 'TV-MA',
    duration: 3186985,
    grandparentArt: '/library/metadata/214524/art/1707144285',
    grandparentGuid: 'plex://show/60755c0fe4609b003683010f',
    grandparentKey: '/library/metadata/214524',
    grandparentRatingKey: '214524',
    grandparentSlug: 'the-best-man-the-final-chapters',
    grandparentThumb: '/library/metadata/214524/thumb/1707144285',
    grandparentTitle: 'The Best Man: The Final Chapters',
    guid: 'plex://episode/635fddc000ead28f1497fa46',
    index: 1,
    key: '/library/metadata/214529',
    librarySectionID: '2',
    librarySectionKey: '/library/sections/2',
    librarySectionTitle: 'TV Shows',
    originalTitle: '',
    originallyAvailableAt: new Date('2022-12-22'),
    parentGuid: 'plex://season/60755c11838c37003572ac4a',
    parentIndex: 1,
    parentKey: '/library/metadata/214525',
    parentRatingKey: '214525',
    parentTitle: 'Season 1',
    ratingKey: '214529',
    sessionKey: '8',
    summary:
      'Harper is a best man yet again when his friends reunite in paradise for Quentin’s impending nuptials. Jordan, Lance, Murch, Robyn, Candace and Shelby each react differently to Harper’s chance to turn “Unfinished Business” into a movie.',
    thumb: '/library/metadata/214529/thumb/1671900383',
    title: 'Paradise',
    type: 'episode',
    updatedAt: 1671900383,
    viewOffset: 666000,
    year: 0,
    Media: [
      {
        audioProfile: 'lc',
        id: '459625',
        videoProfile: 'main 10',
        audioChannels: 6,
        audioCodec: 'ac3',
        bitrate: 0,
        container: 'mpegts',
        duration: 3186985,
        height: 800,
        optimizedForStreaming: false,
        protocol: 'hls',
        videoCodec: 'h264',
        videoFrameRate: '24p',
        videoResolution: '1080p',
        width: 1920,
        selected: true,
        Part: [
          {
            audioProfile: 'lc',
            id: '514025',
            videoProfile: 'main 10',
            bitrate: 0,
            container: 'mpegts',
            duration: 3186985,
            height: 800,
            optimizedForStreaming: false,
            protocol: 'hls',
            width: 1920,
            decision: 'transcode',
            selected: true,
            Stream: [
              {
                bitrate: 2147483647,
                codec: 'h264',
                default: true,
                displayTitle: '1080p (HEVC Main 10)',
                extendedDisplayTitle: '1080p (HEVC Main 10)',
                frameRate: 23.97599983215332,
                height: 800,
                id: '1131888',
                language: '',
                languageCode: '',
                languageTag: '',
                streamType: 1,
                width: 1920,
                decision: 'transcode',
                location: 'segments-av',
              },
              {
                bitrate: 640,
                codec: 'ac3',
                default: true,
                displayTitle: 'English (AAC 5.1)',
                extendedDisplayTitle: 'English (AAC 5.1)',
                id: '1131889',
                language: 'English',
                languageCode: 'eng',
                languageTag: 'en',
                streamType: 2,
                decision: 'transcode',
                location: 'segments-av',
                bitrateMode: 'cbr',
                channels: 6,
                selected: true,
              },
            ],
          },
        ],
      },
    ],
    User: {
      id: '3413670',
      thumb: 'https://plex.tv/users/fc122c91ad1dbbec/avatar?c=1707498055',
      title: 'Musoka31923',
    },
    Player: {
      address: '71.93.80.30',
      device: 'Roku 3',
      machineIdentifier: '23cd3ac16a42932e4a20ab7c6f8319d2',
      model: '4200X',
      platform: 'Roku',
      platformVersion: '12.x',
      product: 'Plex for Roku',
      profile: 'Roku-7.x',
      remotePublicAddress: '71.93.80.30',
      state: 'playing',
      title: 'Roku 3 - 1GN388129771',
      version: '7.14.6.8945-82580c87e-Plex',
      local: false,
      relayed: false,
      secure: true,
      userID: 3413670,
    },
    Session: {
      id: '23cd3ac16a42932e4a20ab7c6f8319d2',
      bandwidth: 10000000,
      location: 'wan',
    },
    TranscodeSession: {
      key: '/transcode/sessions/acae3b19-6970-4a9c-9db5-70c43f84447a-842',
      throttled: true,
      complete: false,
      progress: 18.899999618530273,
      size: -22,
      speed: 0,
      error: false,
      duration: 3186986,
      remaining: 20347,
      context: 'streaming',
      sourceVideoCodec: 'hevc',
      sourceAudioCodec: 'aac',
      videoDecision: 'transcode',
      audioDecision: 'transcode',
      subtitleDecision: '',
      protocol: 'hls',
      container: 'mpegts',
      videoCodec: 'h264',
      audioCodec: 'ac3',
      audioChannels: 6,
      transcodeHwRequested: true,
      transcodeHwDecoding: 'vaapi',
      transcodeHwEncoding: 'vaapi',
      transcodeHwDecodingTitle: 'Intel (VA API)',
      transcodeHwFullPipeline: true,
      transcodeHwEncodingTitle: 'Intel (VA API)',
      timeStamp: 1707506639.4398,
      maxOffsetAvailable: 749.040711,
      minOffsetAvailable: 147.0220184326172,
    },
  },
];

export const Default: Story = {
  args: { session: sessions[0] },
  render: args => <PlexPlayerView {...args} />,
};