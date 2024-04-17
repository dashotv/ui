import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { LoadingIndicator } from '@dashotv/components';

import {
  Download,
  useDownloadMediumQuery,
  useDownloadMutation,
  useDownloadQuery,
  useDownloadSelectionMutation,
} from 'components/Downloads';
import { useDownloadingId } from 'hooks/downloading';

export default function DownloadsShowPage() {
  const { id } = useParams();
  if (!id) {
    return <></>;
  }

  const { isFetching: downloadFetching, data: download } = useDownloadQuery(id);
  const { isFetching: mediaFetching, data: media } = useDownloadMediumQuery(id);
  // const [torrent, setTorrent] = useState<Torrent | undefined>(undefined);
  // const { torrents } = useReleases();
  const downloadUpdate = useDownloadMutation(id);
  const downloadSelection = useDownloadSelectionMutation(id);
  const { torrent } = useDownloadingId(id);

  // useEffect(() => {
  //   if (!torrents || !download || !download.thash) {
  //     return;
  //   }
  //   const t = torrents.get(download.thash);
  //   if (t) {
  //     setTorrent(t);
  //   }
  // }, [torrents, download]);

  const changeInfo = useCallback(
    info => {
      if (!download) {
        return;
      }
      downloadUpdate.mutate({ ...download, ...info });
    },
    [downloadUpdate],
  );

  const changeSetting = useCallback(
    (setting: string, value: boolean | string) => {
      if (!download) {
        return;
      }
      if (setting === 'status' && value === 'searching') {
        downloadUpdate.mutate({ ...download, status: 'searching', release_id: '', url: '' });
        return;
      }
      downloadUpdate.mutate({ ...download, [setting]: value });
    },
    [downloadUpdate],
  );

  const selectRelease = useCallback(
    (url: string) => {
      if (!download) {
        return;
      }
      downloadUpdate.mutate({ ...download, status: 'loading', url: url });
    },
    [downloadUpdate],
  );

  const selectMedium = useCallback(
    (eid: string | null, num: number) => {
      downloadSelection.mutate({ mediumId: eid || '', num: num });
    },
    [downloadSelection],
  );

  return (
    <>
      <Helmet>
        <title>Series{download && download.medium ? ` - ${download.medium.display}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      {(downloadFetching || mediaFetching) && <LoadingIndicator />}
      {download && (
        <Download
          {...{ id, download, changeSetting, changeInfo, selectRelease, selectMedium }}
          type={download?.medium?.type || 'unknown'}
          files={download.files || []}
          episodes={media}
          torrent={torrent}
        />
      )}
    </>
  );
}
