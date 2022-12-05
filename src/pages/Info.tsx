import { Box, Button, Container, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

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
  });

  useEffect(() => {
    if (generateError?.message) {
      toast(
        makeToast({
          description: generateError.message,
          title: 'Generate data',
          status: ToastStatus.ERROR,
        })
      );
    }

    if (deleteError?.message) {
      toast(
        makeToast({
          description: deleteError.message,
          title: 'Delete data',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [generateError, toast, deleteError]);

  return (
    <Box w="full">
      <Container maxWidth="4xl">
        <Button onClick={() => generateFakeData()}>gen</Button>
        <Button onClick={() => deleteData()}>delete</Button>
      </Container>
    </Box>
  );
}

export default Info;
