import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { ChangeEvent, useEffect, useState } from 'react';

import {
  Post,
  useCreatePostMutation,
  useGetPostsQuery,
} from '../../apollo/generated/schema';
import { TAKE_2 } from '../../constants';
import makeToast, { ToastStatus } from '../../helpers/make-toast';
import {
  MessageType,
  OrderByType,
  OrderTypeType,
  SortPostOptionsType,
} from '../../types';
import AddPostModal from './modals/AddPostModal';
import SinglePost from './post';

function Posts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [current, setCurrent] = useState(0);
  const [sortOptions, setSortOptions] = useState<SortPostOptionsType>({
    orderBy: OrderByType.DATE,
    orderType: OrderTypeType.DESC,
  });
  const { data, refetch: refetchPosts } = useGetPostsQuery({
    refetchWritePolicy: 'merge',
    variables: {
      posts: {
        take: TAKE_2,
        skip: current * TAKE_2,
        orderType: sortOptions.orderType,
        orderBy: sortOptions.orderBy,
      },
    },
  });
  const posts = data?.getAllPosts;
  const total = data?.getAllPosts[0]?.total;

  const changePageHandler = (page: number) => {
    setCurrent(page - 1);
  };

  const [createNewPost, { error }] = useCreatePostMutation({
    onCompleted() {
      refetchPosts();
    },
  });

  const createNewPostHandler = ({ message, picture }: MessageType) => {
    createNewPost({
      variables: {
        input: {
          text: message,
          image_url: picture,
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
      setSortOptions({ ...sortOptions, orderType: OrderTypeType.ASC });

      return;
    }
    setSortOptions({ ...sortOptions, orderType: OrderTypeType.DESC });
  };

  const sortByHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOptions({ ...sortOptions, orderBy: e.target.value as OrderByType });
  };

  useEffect(() => {
    refetchPosts();
  }, [refetchPosts, sortOptions]);

  return (
    <>
      <Box pt="70px">
        <Flex justify="space-between">
          <Button onClick={onOpen}>Add post</Button>
          <Flex>
            <Select onChange={sortByHandler} placeholder="order by">
              <option value={OrderByType.DATE}>{OrderByType.DATE}</option>
              <option value={OrderByType.EMAIL}>{OrderByType.EMAIL}</option>
              <option value={OrderByType.USERNAME}>
                {OrderByType.USERNAME}
              </option>
            </Select>
            <Button onClick={sortByTypeHandler}>Up</Button>
          </Flex>
        </Flex>
        <Box>
          <Stack>
            {posts?.map((post) => (
              <SinglePost key={post.id} post={post as Post} />
            ))}
          </Stack>
          {total && TAKE_2 < total && (
            <Pagination
              onChange={changePageHandler}
              current={current + 1}
              pageSize={TAKE_2}
              className="ant-pagination"
              total={total}
            />
          )}
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
