import { Box, Stack } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Resizer from 'react-image-file-resizer';

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      320,
      240,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
      50,
      50
    );
  });

interface IImageResizeProps {
  setImage: Dispatch<SetStateAction<string>>;
}
function ImageResize({ setImage }: IImageResizeProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [shownImage, setShownImage] = useState('');

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    if (!event.target.files) return;

    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);

      setShownImage(image as string);

      if (file.size > 100000) {
        throw new Error(`File is too big`);
      }

      setImage(image as string);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };
  return (
    <Stack>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        accept="image/jpeg, image/png, image/gif"
        type="file"
        onChange={onChange}
      />
      <Box h={70} w={100}>
        <img src={shownImage} alt="" />
      </Box>
    </Stack>
  );
}

export default ImageResize;
