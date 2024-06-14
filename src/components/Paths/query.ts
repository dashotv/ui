import { PathsDelete } from 'client/tower';

import { useMutation } from '@tanstack/react-query';

export const useMutationPathRemove = () => {
  return useMutation({
    mutationFn: ({ id, medium_id }: { id: string; medium_id: string }) => PathsDelete({ id, medium_id }),
  });
};
