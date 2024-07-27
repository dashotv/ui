import * as tower from 'client/tower';

import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export const useEpisodeMutation = (id: string) => {
  return useMutation({
    mutationFn: (episode: tower.Episode) => tower.EpisodesUpdate({ id, episode }),
  });
};

export const patchEpisode = async (id: string, setting: tower.Setting) => {
  const response = await tower.EpisodesSettings({ id, setting });
  return response;
};
export const postEpisodeBatchSetting = async (ids: string[], name: string, value: boolean) => {
  const settings: tower.SettingsBatch = { ids, name, value };
  const response = await tower.EpisodesSettingsBatch({ settings });
  return response;
};

export const useEpisodeSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; setting: tower.Setting }) => patchEpisode(args.id, args.setting),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['series'] });
    },
  });
};
export const useEpisodeBatchSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, field, value }: { ids: string[]; field: string; value: boolean }) =>
      postEpisodeBatchSetting(ids, field, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['series'] });
    },
  });
};
