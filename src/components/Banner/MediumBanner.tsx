import Chrono from 'components/Chrono';
import { Medium } from 'types/medium';

import { Banner } from './Banner';

export type MediumBannerProps = {
  id: string;
  medium: Medium;
};

export function MediumBanner({
  id,
  medium: {
    type,
    cover,
    background,
    title,
    display,
    release_date,
    description,
    unwatched,
    completed,
    favorite,
    broken,
    active,
  },
}: MediumBannerProps) {
  // const [activeCurrent, setActive] = useState(active);
  // const [favoriteCurrent, setFavorite] = useState(favorite);
  // const [completedCurrent, setCompleted] = useState(completed);
  // const [brokenCurrent, setBroken] = useState(broken);

  //   const complete = useCallback(ev => {
  //     console.log('clicked complete');
  //     ev.preventDefault(); // for the buttons inside the Link component
  //   }, []);
  //
  //   const change = useCallback((ev, field, value) => {
  //     console.log('clicked change');
  //     ev.preventDefault(); // for the buttons inside the Link component
  //   }, []);

  const buttons = [
    // {
    //   icon: <DownloadForOfflineIcon color="primary" />,
    //   click: complete,
    //   title: 'create download',
    // },
    // {
    //   icon: <VisibilityOffIcon color="primary" />,
    //   click: complete,
    //   title: 'history???',
    // },
    // {
    //   icon: <ReplayCircleFilledIcon color="primary" />,
    //   click: complete,
    //   title: 'refresh',
    // },
    // {
    //   icon: <BuildCircleIcon color={broken ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     change(id, 'broken', !brokenCurrent);
    //     setBroken(!brokenCurrent);
    //   },
    //   title: 'broken',
    // },
    // {
    //   icon: <CheckCircleIcon color={completedCurrent ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     change(id, 'favorite', !completedCurrent);
    //     setFavorite(!completedCurrent);
    //   },
    //   title: 'completed',
    // },
    // {
    //   icon: <RecommendIcon color={favoriteCurrent ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     change(id, 'favorite', !favoriteCurrent);
    //     setFavorite(!favoriteCurrent);
    //   },
    //   title: 'favorite',
    // },
    // {
    //   icon: <StarsIcon color={activeCurrent ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     change(id, 'active', !activeCurrent);
    //     setActive(!activeCurrent);
    //   },
    //   title: 'active',
    // },
    // {
    //   icon: <RemoveCircleIcon color="error" />,
    //   click: complete,
    //   title: 'delete',
    // },
  ];
  return (
    <Banner
      id={id}
      cover={cover}
      background={background}
      title={title}
      subtitle={display}
      release_date={release_date}
      favorite={favorite}
      broken={broken}
      active={active}
      completed={completed}
      //   change={change}
      buttons={buttons}
      unwatched={unwatched}
      tertiary={<Release date={release_date?.toString()} />}
    />
  );
}

function Release({ date }: { date?: string }) {
  return (
    <div className="header">
      <div className="primary">{date && <Chrono special>{date}</Chrono>}</div>
    </div>
  );
}
