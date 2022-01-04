import { request, gql } from 'graphql-request';
import { API } from './constants';

export const tasksKey = 'tasks';

export const getTasks = async () =>
  await request(
    API,
    gql`
      query {
        tasks {
          id
          name
          isDone
        }
      }
    `
  );

export const getTask = async (id) =>
  await request(
    API,
    gql`
      query {
        task(id: ${id}) {
          id
          name
          isDone
        }
      }
    `
  );

export const createTask = async (name) =>
  await request(
    API,
    gql`
      mutation {
        createTask(createTaskInput: { name: "${name}" }) {
          id
          name
          isDone
        }
      }
    `
  );

export const updateTask = async (task) => {
  const { id, name, isDone } = task;

  return await request(
    API,
    gql`
      mutation {
        updateTask(updateTaskInput: { id: ${id}, name: "${name}", isDone: ${isDone} }) {
          id
          name
          isDone
        }
      }
    `
  );
};

export const removeTask = async (id) =>
  await request(
    API,
    gql`
      mutation {
        removeTask(id: ${id}) {
          id
          name
          isDone
        }
      }
    `
  );
