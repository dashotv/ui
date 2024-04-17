import React from 'react';
import { Helmet } from 'react-helmet-async';

import { LoadingIndicator } from '@dashotv/components';
import { Container } from '@dashotv/components';

import { UsersList, useUsersQuery } from 'components/Users';

export default function UsersPage() {
  const users = useUsersQuery();

  return (
    <>
      <Helmet>
        <title>Home - Users</title>
        <meta name="description" content="dashotv" />
      </Helmet>
      <Container>
        {users.isFetching && <LoadingIndicator />}
        {users.data && <UsersList users={users.data.result} />}
      </Container>
    </>
  );
}
