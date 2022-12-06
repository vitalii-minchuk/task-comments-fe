import { Box, Button, Container, Flex, Text, useToast } from '@chakra-ui/react';

import {
  useDeleteDataMutation,
  useGenerateFakeDataMutation,
} from '../apollo/generated/schema';
import makeToast, { ToastStatus } from '../helpers/make-toast';

function Info() {
  const toast = useToast();
  const [generateFakeData, { error: generateError }] =
    useGenerateFakeDataMutation({
      onCompleted() {
        toast(
          makeToast({
            description: 'Data has been generated',
            title: 'Generate data',
            status: ToastStatus.SUCCESS,
          })
        );
      },
      onError() {
        toast(
          makeToast({
            description:
              generateError?.message ||
              'Access denied! You need to be authorized to perform this action!',
            title: 'Generate data',
            status: ToastStatus.ERROR,
          })
        );
      },
    });
  const [deleteData, { error: deleteError }] = useDeleteDataMutation({
    onCompleted() {
      toast(
        makeToast({
          description: 'Data has been deleted',
          title: 'Delete data',
          status: ToastStatus.SUCCESS,
        })
      );
    },
    onError() {
      toast(
        makeToast({
          description:
            deleteError?.message ||
            'Access denied! You need to be authorized to perform this action!',
          title: 'Delete data',
          status: ToastStatus.ERROR,
        })
      );
    },
  });

  return (
    <Box w="full" py="70px">
      <Container maxWidth="4xl">
        <Box w={3 / 4} mb="80px">
          <Text fontSize="lg">
            To test this app you need to register first, than log in using the
            same email and password. Also you can generate some fake data to
            work with, by pressing generate data button. In order to clean all
            the data click delete data button
          </Text>
        </Box>
        <Flex gap={4}>
          <Button variant="myNormal" onClick={() => generateFakeData()}>
            generate data
          </Button>
          <Button variant="myNormal" onClick={() => deleteData()}>
            delete data
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default Info;
