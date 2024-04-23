import React from 'react';

import { Container } from '@dashotv/components';

import { DestinationTemplatesList } from 'components/DestinationTemplates';
import { ReleaseTypesList } from 'components/ReleaseTypes';

export const SettingsPage = () => {
  return (
    <Container>
      <ReleaseTypesList />
      <DestinationTemplatesList />
    </Container>
  );
};
export default SettingsPage;
