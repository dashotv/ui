import React from 'react';

import { Path } from 'client/tower';

import { PathsList } from 'components/Paths';

export const Paths = ({ medium_id, paths }: { medium_id: string; paths?: Path[] }) => {
  return <PathsList medium_id={medium_id} paths={paths} />;
};
