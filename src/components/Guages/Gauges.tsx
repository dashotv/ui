import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useCountdown } from 'usehooks-ts';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FeedIcon from '@mui/icons-material/Feed';
import OpacityIcon from '@mui/icons-material/Opacity';
import TrafficIcon from '@mui/icons-material/Traffic';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { useNats } from '@quara-dev/react-nats-context';

import { useDownloadsLastQuery } from 'components/Downloads';
import { useMetrics } from 'hooks/metrics';
import { useSub } from 'hooks/sub';

import './gauges.scss';

type GaugeColor = 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning' | undefined;
type GaugeProps = {
  title?: string;
  icon?: React.ReactElement;
  value?: React.ReactElement | string | number;
  color: GaugeColor;
};

export const NatsGauge = () => {
  const { reconnecting, connecting, connected } = useNats();
  const [color, setColor] = useState<'primary' | 'warning' | 'error'>('warning');
  useEffect(() => {
    if (connected) {
      setColor('primary');
    } else if (reconnecting || connecting) {
      setColor('warning');
    } else {
      setColor('error');
    }
  }, [connected, reconnecting, connecting]);
  return (
    <IconButton sx={{ backgroundColor: `${color}.main`, height: '24px', width: '24px' }} size="small">
      <TrafficIcon sx={{ color: 'black' }} fontSize="small" />
    </IconButton>
  );
};

// export const AdminGauge = () => {
//   const [color, setColor] = useState<'primary' | 'warning'>('primary');
//   const location = useLocation();
//   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
//
//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };
//
//   const cb = () => {
//     setColor('warning');
//   };
//   useEffect(() => {
//     if (location.pathname === '/admin') {
//       setColor('primary');
//     }
//   }, [color, location.pathname]);
//   useSub('tower.logs', cb);
//   const pages = [
//     { name: 'Messages', page: '/admin', exact: true },
//     { name: 'Jobs', page: '/admin/jobs' },
//     { name: 'Requests', page: '/admin/requests' },
//     { name: 'Users', page: '/admin/users' },
//   ];
//   //  selected={matchPath(page, exact)}
//   return (
//     <>
//       <IconButton
//         sx={{ backgroundColor: `${color}.main`, height: '24px', width: '24px' }}
//         size="small"
//         onClick={handleOpenNavMenu}
//       >
//         <SvgIcon sx={{ color: 'black', height: '18px', width: '18px' }} component={IoFileTrayFull} inheritViewBox />
//       </IconButton>
//       <Menu
//         id="menu-appbar"
//         anchorEl={anchorElNav}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         keepMounted
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         open={Boolean(anchorElNav)}
//         onClose={handleCloseNavMenu}
//       >
//         {pages.map(({ name, page, exact }) => (
//           <Link key={page} to={page}>
//             <MenuItem sx={{ width: '300px' }} onClick={handleCloseNavMenu}>
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Typography sx={{ pt: 0.5 }}>{name}</Typography>
//               </Stack>
//             </MenuItem>
//           </Link>
//         ))}
//       </Menu>
//     </>
//   );
// };

function Countdown({ eventTime, interval, last }: { eventTime: number; interval: number; last: string }) {
  const [intervalValue] = useState<number>(interval);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: eventTime,
    intervalMs: intervalValue,
  });

  const lastRef = useRef(last);

  useEffect(() => {
    startCountdown();
  });

  useEffect(() => {
    if (lastRef.current !== last) {
      lastRef.current = last;
      resetCountdown();
    }
  }, [last, resetCountdown]);

  return <div title={`${count}`}>{count > 0 ? count : 0}</div>;
}

function DiskGauge({ value, color }: GaugeProps) {
  return <BaseGauge icon={<DownloadForOfflineIcon />} value={value} color={color} />;
}

function CountdownGauge({ color }: GaugeProps) {
  const [last, setLast] = useState('');
  const [event, setEvent] = useState(300);
  const initial = useDownloadsLastQuery();

  useEffect(() => {
    if (initial.data) {
      const seconds = initial.data - Math.round(new Date().getTime() / 1000) + 300;
      setLast(seconds.toString());
      setEvent(seconds);
    }
  }, [initial.data]);

  useSub(
    'tower.notices',
    useCallback(({ message, time }: { message: string; time: string }) => {
      if (message === 'processing downloads') {
        setLast(time);
        setEvent(300);
      }
    }, []),
  );

  return (
    <BaseGauge
      title="Countdown"
      icon={<WatchLaterIcon />}
      value={<Countdown eventTime={event} interval={1000} last={last} />}
      color={initial.isFetching ? 'secondary' : color}
    />
  );
}

function NzbsGauge({ value, color }: GaugeProps) {
  return <BaseGauge title="NZBGet" icon={<FeedIcon />} value={value} color={color} />;
}

function TorrentsGauge({ value, color }: GaugeProps) {
  return <BaseGauge title="Torrent" icon={<OpacityIcon />} value={value} color={color} />;
}

function BaseGauge({ icon, value, color }: GaugeProps) {
  return <Chip icon={icon} label={value} color={color} size="small" />;
}

export function Gauges() {
  const { diskfree, torrents, nzbs } = useMetrics();

  return (
    <Stack spacing={1} direction="row" alignItems="center" sx={{ height: '51px', pt: 1.3, pb: 1 }}>
      <CountdownGauge color="primary" />
      <DiskGauge value={diskfree} color={Number(diskfree) > 25.0 ? 'primary' : 'warning'} />
      <NzbsGauge value={nzbs} color="primary" />
      <TorrentsGauge value={torrents} color="primary" />
      <NatsGauge />
    </Stack>
  );
}
