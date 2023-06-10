import * as React from 'react';

import { Banner } from './Banner';
import Details from './Details';
import Episodes from './Episodes';
import { MediumTabs } from './MediumTabs';
import Paths from './Paths';
import Seasons from './Seasons';
import Watches from './Watches';
import './banner.scss';
import './large.scss';

export default function MediumLarge(props) {
  const tabsMap = {
    Episodes: (
      <>
        <Seasons current={props.currentSeason} seasons={props.seasons} changeSeason={props.changeSeason} />
        <Episodes episodes={props.episodes} changeEpisode={props.changeEpisode} />
      </>
    ),
    Paths: <Paths paths={props.paths} />,
    Downloads: <div>downloads</div>,
    Watches: <Watches data={props.watches} />,
    Details: <Details data={props.data} cover={props.data.cover} background={props.data.background} />,
  };

  return (
    <div className="medium large">
      <Banner
        title={props.data.title}
        release_date={props.data.release_date}
        id={props.data.id}
        favorite={props.data.favorite}
        broken={props.data.broken}
        active={props.data.active}
        change={props.change}
        background={props.data.background}
      />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
