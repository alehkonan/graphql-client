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

export const Task = ({ task: initialTask }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: update, isLoading: updating } = useMutation(updateTask);
  const { mutateAsync: remove, isLoading: removing } = useMutation(removeTask);

  const [isEditMode, setEditMode] = useState(false);
  const [task, setTask] = useState(initialTask);

  const handleDone = async () => {
    setTask((prev) => ({ ...prev, isDone: !prev.isDone }));
    try {
      await update(task);
    } catch (error) {
      queryClient.invalidateQueries(tasksKey);
    }
  };

  const handleUpdate = async () => {
    setEditMode(!isEditMode);
    if (!isEditMode) return;
    try {
      await update(task);
    } catch (error) {
      queryClient.invalidateQueries(tasksKey);
    }
  };

  const handleDelete = async () => {
    try {
      await remove(task.id);
      queryClient.invalidateQueries(tasksKey);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Card style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={task.isDone} onChange={handleDone} />
      <Box style={{ flexGrow: 1 }}>
        {isEditMode ? (
          <InputBase
            value={task.name}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, name: e.target.value }))
            }
            fullWidth
          />
        ) : (
          <Typography>{task.name}</Typography>
        )}
      </Box>
      <IconButton onClick={handleUpdate} disabled={updating || removing}>
        {isEditMode ? <CheckIcon /> : <EditIcon />}
      </IconButton>
      <IconButton onClick={handleDelete} disabled={updating || removing}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};
