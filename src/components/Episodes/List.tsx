import React, { useEffect, useState } from 'react';

import { Episode } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack, Typography } from '@mui/material';

import { ButtonMap, ButtonMapButton, Row } from '@dashotv/components';

import { EpisodeDialog } from './Dialog';
import { EpisodeRow } from './Row';
import { useEpisodeBatchSettingMutation, useEpisodeSettingMutation } from './query';

export const EpisodesList = ({ episodes, kind }: { episodes: Episode[]; kind: string }) => {
  const [selected, setSelected] = useState<Episode | null>(null);
  const map = new Map<number, Episode[]>();

  const [ids, setIds] = useState<string[]>([]);
  const [skipped, setSkipped] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [watched, setWatched] = useState(false);

  const settings = useEpisodeBatchSettingMutation();
  const episodeSetting = useEpisodeSettingMutation();

  episodes.forEach(episode => {
    const key = episode.season_number || 0;
    const list = map.get(key) || [];
    list.push(episode);
    map.set(key, list);
  });

  useEffect(() => {
    setIds(() => episodes.map(episode => episode.id || '').filter(id => id));
    setSkipped(() => episodes.filter(episode => episode.skipped).length === episodes.length);
    setDownloaded(() => episodes.filter(episode => episode.downloaded).length === episodes.length);
    setCompleted(() => episodes.filter(episode => episode.completed).length === episodes.length);
    setWatched(() => episodes.filter(episode => episode.watched).length === episodes.length);
  }, [episodes]);

  const updateSettings = (field: string, value: boolean) => {
    settings.mutate({ ids, field, value });
  };
  const changeEpisode = (id: string, key: string, value: boolean) => {
    episodeSetting.mutate({ id: id, setting: { name: key, value: value } });
  };

  const select = (episode: Episode | null) => {
    console.log('select', episode);
    setSelected(episode);
  };

  const buttons: ButtonMapButton[] = [
    {
      Icon: NextPlanIcon,
      color: skipped ? 'secondary' : 'disabled',
      click: () => updateSettings('skipped', !skipped),
      title: 'skipped',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'disabled',
      click: () => updateSettings('downloaded', !downloaded),
      title: 'downloaded',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'disabled',
      click: () => updateSettings('completed', !completed),
      title: 'completed',
    },
    {
      Icon: VisibilityIcon,
      color: watched ? 'secondary' : 'disabled',
      click: () => updateSettings('watched', !watched),
      title: 'watched',
    },
  ];

  return (
    <>
      <Row>
        <ButtonMap buttons={buttons} size="small" />
      </Row>
      {[...map.entries()].map(([season, episodes]) => (
        <React.Fragment key={season}>
          <Row key={season}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography variant="subtitle2" color="gray">
                Season {season}
              </Typography>
            </Stack>
          </Row>
          {episodes.map(episode => (
            <EpisodeRow
              key={episode.id}
              kind={kind}
              episode={episode}
              changeEpisode={changeEpisode}
              selectEpisode={select}
            />
          ))}
        </React.Fragment>
      ))}
      {selected && (
        <EpisodeDialog
          open={selected !== null}
          handleClose={() => {
            setSelected(null);
          }}
          kind={kind}
          episode={selected}
        />
      )}
    </>
  );
};
