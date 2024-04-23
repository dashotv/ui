import React from 'react';

import { Container } from '@dashotv/components';

import { DestinationTemplatesList } from 'components/DestinationTemplates';
import { LibrarysList } from 'components/Libraries';
import { ReleaseTypesList } from 'components/ReleaseTypes';

export const SettingsPage = () => {
  return (
    <Container>
      <ReleaseTypesList />
      <DestinationTemplatesList />
      <LibrarysList />
    </Container>
  );
};
export default SettingsPage;
