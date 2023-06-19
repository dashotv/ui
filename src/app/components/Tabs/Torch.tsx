import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';

import LoadingIndicator from '../Loading';
import { ReleasesList } from '../Releases/ReleasesList';
import { Search } from '../Search';

const pagesize = 25;
export function Torch(props) {
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState([]);
  const [form, setForm] = useState(props.form);
  const { enqueueSnackbar } = useSnackbar();

  const queryString = useCallback(form => {
    const str = [];
    for (const p in form)
      if (form.hasOwnProperty(p)) {
        // @ts-ignore
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(form[p]));
      }
    const qs = str.join('&');
    console.log('queryString=', qs);
    return qs;
  }, []);

  useEffect(() => {
    const getReleases = () => {
      setLoading(true);
      const qs = queryString(form);
      axios
        .get(`/api/scry/releases/?limit=${pagesize}&${qs}`)
        .then(response => {
          console.log(response.data);
          setReleases(response.data.Releases);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getReleases();
  }, [form, queryString, enqueueSnackbar]);

  const click = useCallback(ev => {
    console.log('click');
  }, []);

  const actions = [
    {
      icon: <OutboundRoundedIcon fontSize="small" color="primary" />,
      click: click,
      title: 'view source',
    },
    {
      icon: <CheckCircleIcon fontSize="small" color="primary" />,
      click: click,
      title: 'select',
    },
  ];

  return (
    <>
      {loading && <LoadingIndicator />}
      <Search form={form} setForm={setForm} />
      <ReleasesList data={releases} actions={actions} />
    </>
  );
}

// function TorchResults(props) {
//   return (
//     <div className="releases">
//       <table className="vertical-table">
//         <thead>
//           <tr>
//             <td className="number"></td>
//             <td className="number"></td>
//             <td className="date">Type</td>
//             <td>Title</td>
//             <td className="actions" align="right">
//               Published
//             </td>
//             <td className="actions" align="right">
//               Actions
//             </td>
//           </tr>
//         </thead>
//         <tbody>
//           {props.releases &&
//             props.releases.map(
//               ({ id, type, nzb, source, display, raw, resolution, group, author, published, verified }) => (
//                 <TorchResultsRow
//                   key={id}
//                   id={id}
//                   type={type}
//                   nzb={nzb}
//                   display={display}
//                   raw={raw}
//                   verified={verified}
//                   source={source}
//                   resolution={resolution}
//                   published={published}
//                   author={author}
//                   group={group}
//                 />
//               ),
//             )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
//
// function TorchResultsRow(props) {
//   const resolution = useCallback(r => {
//     if (r) {
//       return <Chip label={r} size="small" color="primary" />;
//     }
//     return;
//   }, []);
//
//   const group = useCallback(() => {
//     if (props.group) {
//       return <Typography variant="overline">{props.group}</Typography>;
//     }
//     if (props.author) {
//       return <Typography variant="overline">[{props.author}]</Typography>;
//     }
//     return '';
//   }, [props.author, props.group]);
//
//   return (
//     <tr>
//       <td>
//         {props.verified ? (
//           <CheckCircleIcon color="primary" fontSize="small" />
//         ) : (
//           <CheckCircleOutlineIcon fontSize="small" />
//         )}
//       </td>
//       <td>{props.nzb ? <ArticleIcon fontSize="small" /> : <WavesIcon fontSize="small" />}</td>
//       <td>
//         <Typography variant="overline">
//           {props.source}:{props.type}
//         </Typography>
//       </td>
//       <td>
//         <Stack spacing={1} direction="row">
//           <Link to={props.id} title={props.raw}>
//             <Typography variant="subtitle1">{props.display}</Typography>
//           </Link>
//           {resolution(props.resolution)}
//           {group()}
//         </Stack>
//       </td>
//       <td align="right">
//         <Moment fromNow>{props.published}</Moment>
//       </td>
//       <td align="right">
//         <IconButton size="small">
//           <EditIcon fontSize="small" />
//         </IconButton>
//         <IconButton size="small">
//           <DeleteIcon fontSize="small" />
//         </IconButton>
//         <IconButton size="small">
//           <DeleteForeverIcon fontSize="small" />
//         </IconButton>
//       </td>
//     </tr>
//   );
// }
