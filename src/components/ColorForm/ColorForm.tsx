import React, { useState } from 'react';
import { ColorFormInputs, ColorFormProps } from './ColorForm.types';
import { useForm } from 'react-hook-form';
import { Button, Input, Stack, Typography } from '@mui/material';

export const ColorForm: React.FC<ColorFormProps> = ({ onSubmit }) => {
  const [hasUnsaved, setHasUnsaved] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
  } = useForm<ColorFormInputs>({
    defaultValues: {
      color1: '#ea6363',
      color2: '#89f60d',
      color3: '#3570e5',
    },
  });

  return (
    <Stack
      component={'form'}
      spacing={2}
      direction={'column'}
      sx={{ width: 150 }}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setHasUnsaved(false);
      })}
    >
      <Typography color={'primary'}>
        1. Выберите цвета
      </Typography>
      <Input
        {...register('color1', { required: true })}
        type={'color'}
        onClick={() => setHasUnsaved(true)}
      />
      <Input
        {...register('color2', { required: true })}
        type={'color'}
        onClick={() => setHasUnsaved(true)}
      />
      <Input
        {...register('color3', { required: true })}
        type={'color'}
        onClick={() => setHasUnsaved(true)}
      />
      <Button
        type={'submit'}
        variant={'contained'}
        disabled={!hasUnsaved}
      >
        Сохранить
      </Button>
    </Stack>
  );
};
