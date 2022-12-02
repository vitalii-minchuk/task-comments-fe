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
  const [newImage, setNewImage] = useState('');
  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setNewImage(image as string);
      setImage(image as string);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Stack>
      <input
        accept="image/jpeg, image/png, image/gif"
        type="file"
        onChange={onChange}
      />
      <Box h={70} w={100}>
        <img src={newImage} alt="" />
      </Box>
    </Stack>
  );
}

export default ImageResize;
