import { Alert, Box, LinearProgress, Skeleton, Snackbar } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { getTasks, tasksKey } from '../../api/tasks';
import { Task } from './Task';

export const TasksContainer = () => {
  const {
    data = {},
    isFetching,
    isLoading,
    isError,
  } = useQuery(tasksKey, getTasks);
  const { tasks = [] } = data;

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
      {isLoading &&
        Array.from(new Array(6)).map((_, i) => (
          <Skeleton key={i} width="100%" />
        ))}
      {isFetching && (
        <LinearProgress style={{ position: 'fixed', top: 0, width: '100%' }} />
      )}
      {isError && (
        <Snackbar autoHideDuration={2000}>
          <Alert severity="error">Error</Alert>
        </Snackbar>
      )}
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </Box>
  );
};
