import React from 'react';

import { Container } from '@dashotv/components';

import { LibrariesList } from 'components/Libraries';
import { LibraryTemplatesList } from 'components/LibraryTemplates';
import { LibraryTypesList } from 'components/LibraryTypes';

export const SettingsPage = () => {
  return (
    <Container>
      <LibrariesList />
      <LibraryTypesList />
      <LibraryTemplatesList />
    </Container>
  );
};
export default SettingsPage;
