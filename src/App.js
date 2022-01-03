import { Box } from '@mui/material';
import React from 'react';
import { CreateTaskForm } from './components/CreateTaskForm';

import { TasksContainer } from './components/TasksContainer';

export const App = () => {
  return (
    <Box component="main" display="grid" gap={2} p={2}>
      <CreateTaskForm />
      <TasksContainer />
    </Box>
  );
};
