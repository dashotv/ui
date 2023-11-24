import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Chrono } from 'components/Common';
import { User } from 'types/user';

export function UsersList({ users }: { users: User[] }) {
  return (
    <>
      <div className="releases">
        <table className="vertical-table">
          <thead>
            <tr>
              <td className="number"></td>
              <td className="actions">User</td>
              <td>Title</td>
              <td className="actions" align="right">
                Created
              </td>
            </tr>
          </thead>
          <tbody>{users && users.map((user: User) => <UserRow key={user.id} {...user} />)}</tbody>
        </table>
      </div>
    </>
  );
}

export function UserRow({ id, name, email, created_at }: User) {
  return (
    <>
      <tr key={id}>
        <td>
          <CheckCircleIcon fontSize="small" color="success" />
        </td>
        <td className="actions">{name}</td>
        <td>{email}</td>
        <td className="actions" align="right">
          <Chrono fromNow>{created_at.toString()}</Chrono>
        </td>
      </tr>
    </>
  );
}
