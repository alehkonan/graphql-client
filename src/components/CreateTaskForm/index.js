import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createTask, tasksKey } from '../../api/tasks';

const formFields = { name: 'name' };
const initialForm = { [formFields.name]: '' };

export const CreateTaskForm = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, reset } = useMutation(createTask);

  const [form, setForm] = useState(initialForm);

  const updateForm = (event) => {
    setForm({ [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await mutateAsync(form[formFields.name]);
      queryClient.invalidateQueries(tasksKey);
    } catch (error) {
      console.log(error.message);
    } finally {
      setForm(initialForm);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    reset();
  };

  return (
    <Box
      component="form"
      display="flex"
      justifyContent="center"
      gap={3}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <TextField
        color="info"
        name={formFields.name}
        label="Task name"
        value={form.name}
        onChange={updateForm}
        size="small"
      />
      <Button variant="outlined" type="submit">
        Create task
      </Button>
      <Button variant="outlined" type="reset">
        Reset error
      </Button>
    </Box>
  );
};
