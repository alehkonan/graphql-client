import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useMutation, useQueryClient } from 'react-query';
import { removeTask, tasksKey, updateTask } from '../../api/tasks';

export const Task = ({ task }) => {
  const queryClient = useQueryClient();
  const [isEditMode, setEditMode] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [taskIsDone, setTaskDone] = useState(task.isDone);

  const updateTaskMutation = useMutation(
    (isDone = taskIsDone) => updateTask(task.id, taskName, isDone),
    {
      onMutate: async () => await queryClient.cancelQueries(),
      onSuccess: ({ updateTask }) => {
        setTaskDone(updateTask.isDone);
        queryClient.setQueryData(tasksKey, (queryData) => ({
          ...queryData,
          tasks: queryData.tasks.map((task) =>
            task.id === updateTask.id ? updateTask : task
          ),
        }));
      },
    }
  );

  const removeTaskMutation = useMutation(() => removeTask(task.id), {
    onSuccess: ({ removeTask }) => {
      queryClient.setQueryData(tasksKey, (queryData) => ({
        ...queryData,
        tasks: queryData.tasks.filter((task) => task.id !== removeTask.id),
      }));
    },
  });

  const handleEdit = () => {
    if (!isEditMode) {
      setEditMode(true);
      return;
    }
    updateTaskMutation.mutate();
    setEditMode(false);
  };

  const changeTaskName = (event) => setTaskName(event.target.value);

  const disableAction =
    updateTaskMutation.isLoading || removeTaskMutation.isLoading;

  return (
    <Card style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        checked={taskIsDone}
        onChange={() => updateTaskMutation.mutate(!taskIsDone)}
      />
      <Box style={{ flexGrow: 1 }}>
        {isEditMode ? (
          <InputBase value={taskName} onChange={changeTaskName} fullWidth />
        ) : (
          <Typography>{taskName}</Typography>
        )}
      </Box>
      <IconButton onClick={handleEdit} disabled={disableAction}>
        {isEditMode ? <CheckIcon /> : <EditIcon />}
      </IconButton>
      <IconButton onClick={removeTaskMutation.mutate} disabled={disableAction}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};
