import React, { useState } from 'react';

import { Grid } from '@mui/material';

import { LoadingIndicator, Pagination } from '@dashotv/components';

import { Container } from 'components/Common';

import { FilesList } from './List';
import { useQueryFiles } from './query';

export interface FilesTabProps {
  medium_id: string;
}
const limit = 30;
export const FilesTab = ({ medium_id }: FilesTabProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQueryFiles(page, medium_id, limit);
  const total = data?.total || 0;
  const pages = Math.ceil(total / limit);

  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* <FilesBreadcrumbs library={library} medium={medium} /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <Pagination size="small" count={pages} page={page} total={total} onChange={onChange} />
        </Grid>
      </Grid>
      {isLoading ? <LoadingIndicator /> : null}
      <FilesList data={data?.result} />
    </Container>
  );
};
