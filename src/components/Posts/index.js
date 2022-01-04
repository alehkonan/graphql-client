import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useQuery } from 'react-query';
import { getPosts, postsKey } from '../../api/posts';

export const Posts = () => {
  const { data, isLoading } = useQuery(postsKey, getPosts);

  return (
    <Box
      component="section"
      display="grid"
      gap={2}
      gridTemplateColumns="repeat(4, 1fr)"
    >
      {isLoading &&
        Array.from(new Array(8)).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={300} />
        ))}
      {data &&
        data.map((post) => (
          <Card
            key={post.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardHeader title={post.title} />
            <CardContent sx={{ flexGrow: 1 }}>{post.body}</CardContent>
            <CardActions sx={{ alignSelf: 'flex-end' }}>
              <Avatar>{post.userId}</Avatar>
            </CardActions>
          </Card>
        ))}
    </Box>
  );
};
