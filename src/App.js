import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { CREATE_USER } from './mutation/user';
import { GET_ALL_USERS } from './query/user';

export const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: '',
    age: 0,
  });

  useEffect(() => {
    if (!loading) setUsers(data.getAllUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getAllUsers = async (event) => {
    event.preventDefault();
    await refetch();
  };

  const createUser = async (event) => {
    event.preventDefault();
    const { data } = await newUser({
      variables: {
        input: form,
      },
    });
    setUsers((prev) => [...prev, data.createUser]);
    setForm({
      username: '',
      age: 0,
    });
  };

  if (loading) return <h4>Loading...</h4>;

  if (error) return <h4>Error</h4>;

  return (
    <div>
      <form onSubmit={createUser}>
        <input
          type="text"
          value={form.username}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          type="number"
          value={form.age}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, age: +e.target.value }))
          }
        />
        <button type="submit">Create user</button>
        <button onClick={getAllUsers}>Get all users</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};
