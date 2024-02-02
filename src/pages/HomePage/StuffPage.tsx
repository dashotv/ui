import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Container } from 'components/Layout';
import { Stuff } from 'components/Stuff';

export default function StuffPage() {
  return (
    <>
      <Helmet>
        <title>Home - Stuff</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Stuff />
      </Container>
    </>
  );
}
