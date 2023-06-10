import * as React from 'react';

import { Banner } from './Banner';
import Details from './Details';
import { MediumTabs } from './MediumTabs';
import Paths from './Paths';
import './large.scss';

export default function MediumMovie(props) {
  const tabsMap = {
    Paths: <Paths paths={props.paths} />,
    Downloads: <div>downloads</div>,
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
