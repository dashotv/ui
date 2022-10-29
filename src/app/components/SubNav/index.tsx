import * as React from 'react';
import Container from '@mui/material/Container';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './SubNav.scss';

export default function SubNav(props) {
  const location = useLocation();

  const matchPath = p => {
    return p === location.pathname;
  };

  return (
    <Container maxWidth="xl">
      <div className="subnav">
        {props.items &&
          props.items.map(({ name, path }) => (
            <Link key={name} to={path}>
              <Button variant={matchPath(path) ? 'outlined' : 'text'}>
                <Typography textAlign="center">{name}</Typography>
              </Button>
            </Link>
          ))}
      </div>
    </Container>
  );
}
