import * as React from 'react';
import { Banner } from './Banner';
import { MediumTabs } from './MediumTabs';
import Seasons from './Seasons';
import Episodes from './Episodes';
import Files from './Files';
import Details from './Details';
import Watches from './Watches';
import './large.scss';
import './banner.scss';

export default function MediumLarge(props) {
  const tabsMap = {
    Episodes: (
      <>
        <Seasons
          current={props.currentSeason}
          seasons={props.seasons}
          changeSeason={props.changeSeason}
        />
        <Episodes
          episodes={props.episodes}
          changeEpisode={props.changeEpisode}
        />
      </>
    ),
    Files: <Files paths={props.paths} />,
    Downloads: <div>downloads</div>,
    Watches: <Watches data={props.watches} />,
    Details: <Details data={props.data} />,
  };

  return (
    <div className="medium large">
      <Banner
        cover={props.data.cover}
        background={props.data.background}
        title={props.data.title}
        release_date={props.data.release_date}
        id={props.data.id}
        favorite={props.data.favorite}
        broken={props.data.broken}
        active={props.data.active}
        change={props.change}
      />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
