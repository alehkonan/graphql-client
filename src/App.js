import { Box } from '@mui/material';
import React from 'react';
import { CreateTaskForm } from './components/CreateTaskForm';
import { GlobalFetchIndicator } from './components/GlobalFetchIndicator';
import { Posts } from './components/Posts';
import { TasksContainer } from './components/TasksContainer';

export const App = () => {
  return (
    <Box component="main" display="grid" gap={2} p={2}>
      <GlobalFetchIndicator />
      <CreateTaskForm />
      <TasksContainer />
      <Posts />
    </Box>
  );
};
