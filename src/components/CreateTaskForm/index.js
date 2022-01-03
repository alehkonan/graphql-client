import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createTask, tasksKey } from '../../api/tasks';

const formFields = { name: 'name' };
const initialForm = { [formFields.name]: '' };

export const CreateTaskForm = () => {
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation((name) => createTask(name), {
    onMutate: () => {
      setForm(initialForm);
    },
    onSuccess: ({ createTask }) => {
      queryClient.setQueryData(tasksKey, (queryData) => ({
        ...queryData,
        tasks: [...queryData.tasks, createTask],
      }));
    },
    onError: (err) => console.log(err),
  });

  const [form, setForm] = useState(initialForm);

  const updateForm = (event) => {
    setForm({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTaskMutation.mutate(form[formFields.name]);
  };

  return (
    <Box
      component="form"
      display="flex"
      justifyContent="center"
      gap={3}
      onSubmit={handleSubmit}
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
    </Box>
  );
};
