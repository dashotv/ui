import React from 'react';

import { MenuMap, MenuMapItem } from 'components/Common';

export const NavbarMenu = () => {
  const items: MenuMapItem[] = [
    {
      name: 'QBT',
      url: 'http://qbittorrent.dasho.net',
    },
    {
      name: 'NZB',
      url: 'http://nzbget.dasho.net',
    },
    {
      name: 'Metube',
      url: 'http://10.0.4.62:10003',
    },
  ];
  return <MenuMap items={items} />;
};
