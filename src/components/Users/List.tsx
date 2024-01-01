import React from 'react';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono, Row } from 'components/Common';

import { User } from './types';

export function UsersList({ users }: { users: User[] }) {
  return <Paper elevation={0}>{users && users.map((user: User) => <UserRow key={user.id} {...user} />)}</Paper>;
}

export function UserRow({ id, name, email, created_at }: User) {
  return (
    <Row key={id}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} width="100%" alignItems="center">
        <Stack width="100%" direction="row" spacing={1} alignItems="center">
          <Typography fontWeight="bolder" color="primary" noWrap>
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary" noWrap>
            {email}
          </Typography>
        </Stack>
        <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="end">
          <Typography variant="subtitle2" color="gray" noWrap>
            <Chrono fromNow>{created_at}</Chrono>
          </Typography>
        </Stack>
      </Stack>
    </Row>
    // <>
    //   <tr key={id}>
    //     <td>
    //       <CheckCircleIcon fontSize="small" color="success" />
    //     </td>
    //     <td className="actions">{name}</td>
    //     <td>{email}</td>
    //     <td className="actions" align="right">
    //       <Chrono fromNow>{created_at.toString()}</Chrono>
    //     </td>
    //   </tr>
    // </>
  );
}
