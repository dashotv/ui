export const SeasonEpisodeAbsolute = ({
  season,
  episode,
  absolute,
}: {
  kind: string;
  season?: number;
  episode?: number;
  absolute?: number;
}) => {
  const padded = (value: number = 0, places: number = 2) => `${value}`.padStart(places, '0');
  return `${padded(season, 2)}x${padded(episode, 2)}${absolute ? ` #${padded(absolute, 3)}` : ''}`;
};
