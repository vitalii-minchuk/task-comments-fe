import {
  Box,
  Button,
  Flex,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import 'rc-pagination/assets/index.css';

import {
  Post,
  useCreatePostMutation,
  useGetPostsQuery,
} from '../../apollo/generated/schema';
import makeToast, { ToastStatus } from '../../helpers/make-toast';
import AddPostModal from './modals/AddPostModal';
import SinglePost from './post';
import { OrderTypeType, SortPostOptionsType } from '../../types';

function Posts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [current, setCurrent] = useState(0);
  const [take, setTake] = useState(2);
  const [sortOptions, setSortOptions] = useState<SortPostOptionsType>({
    orderBy: 'createdAt',
    orderType: OrderTypeType.DESC,
  });

  const changePageHandler = (page: number) => {
    console.log(page);
    setCurrent(page - 1);
  };

  const { data, refetch: refetchPosts } = useGetPostsQuery({
    refetchWritePolicy: 'merge',
    variables: {
      posts: {
        take,
        skip: current * take,
        orderType: sortOptions.orderType,
        orderBy: sortOptions.orderBy,
      },
    },
  });

  const posts = data?.getAllPosts;
  const total = data?.getAllPosts[0]?.total;

  const [createNewPost, { error }] = useCreatePostMutation({
    onCompleted() {
      refetchPosts();
    },
  });

  const createNewPostHandler = (post: string) => {
    createNewPost({
      variables: {
        input: {
          text: post,
        },
      },
    });
  };

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Create post',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);

  const sortByTypeHandler = () => {
    if (sortOptions.orderType === OrderTypeType.DESC) {
      console.log('first');
      setSortOptions({ ...sortOptions, orderType: OrderTypeType.ASC });

      return;
    }
    setSortOptions({ ...sortOptions, orderType: OrderTypeType.DESC });
  };

  useEffect(() => {
    refetchPosts();
  }, [sortOptions]);
  console.log(sortOptions.orderType);

  return (
    <>
      <Box pt="70px">
        <Flex justify="space-between">
          <Button onClick={onOpen}>Add post</Button>
          <Flex>
            <Button onClick={sortByTypeHandler}>Up</Button>
          </Flex>
        </Flex>
        <Box>
          <Stack>
            {posts?.map((post) => (
              <SinglePost key={post.id} post={post as Post} />
            ))}
          </Stack>
          <Pagination
            onChange={changePageHandler}
            current={current + 1}
            pageSize={take}
            className="ant-pagination"
            total={total}
          />
        </Box>
      </Box>
      <AddPostModal
        createNewPostHandler={createNewPostHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Posts;
