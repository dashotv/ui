import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import { IconCheckbox, Option, Select, Text } from 'components/Form';

import {
  Indexer,
  RunicSource,
  RunicSourceCapsCategories,
  RunicSourceCapsCategoriesCategory,
  RunicSourceCapsCategoriesCategorySubcat,
  useRunicSourcesQuery,
} from '.';

export type IndexerDialogProps = {
  indexer: Indexer;
  handleClose: (data?: Indexer) => void;
};
export const IndexerDialog = ({ indexer, handleClose }: IndexerDialogProps) => {
  const { control, handleSubmit, setValue } = useForm<Indexer>({ values: indexer });
  const [open, setOpen] = useState(false);
  const { isFetched, data } = useRunicSourcesQuery();
  const [sources, setSources] = useState<Option[]>([]);
  const [categories, setCategories] = useState<RunicSourceCapsCategories>();
  const [cats, setCats] = useState<number[]>(indexer.categories ?? []);
  const close = () => {
    setOpen(false);
    handleClose();
  };
  const submit = (data: Indexer) => {
    setOpen(false);
    data.categories = cats;
    handleClose(data);
  };

  useEffect(() => {
    setSources(data?.results?.map((s: RunicSource) => ({ label: s.Name, value: s.Name })) ?? []);
    setOpen(true);

    const source = data?.results?.find((s: RunicSource) => s.Name === indexer.name);
    if (source) {
      setCategories(source.Caps.Categories);
      if (!indexer.url) {
        setValue('url', source.URL);
      }
    }
  }, [data?.results, indexer.name]);

  const onChangeSource = (value: string) => {
    const source = data?.results?.find((s: RunicSource) => s.Name === value);
    if (source) {
      setValue('url', source.URL);
      setCategories(source.Caps.Categories);
    }
  };

  const isSet = (id: number) => {
    if (!cats || cats.length === 0) {
      return false;
    }
    console.log('isSet', id, cats);
    return cats.some(x => x === id);
  };
  const set = (id: number, value: boolean) => {
    if (value) {
      setCats(cats => {
        return [...cats, id];
      });
    } else {
      setCats(cats => {
        return [...cats.filter(i => i !== id)];
      });
    }
  };

  if (!isFetched || !sources || !categories) {
    return null;
  }

  return (
    <Dialog open={open} onClose={() => close()} fullWidth={true} maxWidth="sm">
      <DialogTitle>Edit Indexer</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
          <Stack direction="column" spacing={1}>
            <Select name="name" control={control} options={sources} onChange={e => onChangeSource(e.target.value)} />
            <Text name="url" control={control} />
          </Stack>
          <Box sx={{ mt: 3, maxHeight: '300px', overflow: 'auto' }}>
            {categories && <Categories {...{ categories, set, isSet }} />}
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 3, width: '100%', justifyContent: 'end' }}>
            <IconCheckbox
              name="active"
              label="Active"
              control={control}
              icon={<CircleOutlinedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            <Button variant="contained" onClick={() => close()}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Ok
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const Categories = ({
  categories,
  isSet,
  set,
}: {
  categories: RunicSourceCapsCategories;
  isSet: (id: number) => boolean;
  set: (id: number, value: boolean) => void;
}) => {
  return (
    <Stack direction="column" spacing={0} sx={{ mr: 2 }}>
      <Typography variant="body1" color="primary" fontWeight="bold" sx={{ ml: '29px' }}>
        Name
      </Typography>
      {categories.Category.map((c: RunicSourceCapsCategoriesCategory) => (
        <Box key={c.ID} sx={{ mb: 1 }}>
          <Category category={c} {...{ set, isSet }} />
          {c.Subcat?.map((s: RunicSourceCapsCategoriesCategorySubcat) => (
            <Category key={s.ID} category={s} {...{ set, isSet }} />
          ))}
        </Box>
      ))}
    </Stack>
  );
};
const Category = ({
  category,
  isSet,
  set,
  disabled,
}: {
  category: RunicSourceCapsCategoriesCategory | RunicSourceCapsCategoriesCategorySubcat;
  disabled?: boolean;
  isSet: (id: number) => boolean;
  set: (id: number, value: boolean) => void;
}) => {
  return (
    <Stack direction="row" spacing={2} alignItems="baseline">
      <Stack direction="row" spacing={1} alignItems="baseline">
        <input
          type="checkbox"
          onChange={e => set(Number(category.ID), e.target.checked)}
          checked={isSet(Number(category.ID))}
          name={category.ID}
          disabled={disabled}
        />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="baseline">
        <Typography variant="body1">{category.Name}</Typography>
        <Typography variant="caption" color="gray">
          {category.ID}
        </Typography>
      </Stack>
    </Stack>
  );
};
