import React from 'react';
import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';

import { LoadingIndicator } from 'components/Common';
import { UsersList, useUsersQuery } from 'components/Users';

export default function UsersPage() {
  const users = useUsersQuery();

  return (
    <>
      <Helmet>
        <title>Home - Users</title>
        <meta name="description" content="dashotv" />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        {users.isFetching && <LoadingIndicator />}
        {users.data && <UsersList users={users.data} />}
      </Container>
    </>
  );
}
