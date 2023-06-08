import * as React from 'react';
import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './SubNav.scss';

export default function SubNav(props) {
  const location = useLocation();

  const matchPath = (path, exact) => {
    if (exact) {
      return path === location.pathname;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Container maxWidth="xl">
      <div className="subnav">
        {props.items &&
          props.items.map(({ name, path, exact }) => (
            <Link key={name} to={path}>
              <Button variant={matchPath(path, exact) ? 'outlined' : 'text'}>
                <Typography textAlign="center">{name}</Typography>
              </Button>
            </Link>
          ))}
      </div>
    </Container>
  );
}
