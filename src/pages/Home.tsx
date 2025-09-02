import styled from '@emotion/styled';
import { Box, Button, Text, Stack } from '@chakra-ui/react';

const Test = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colors.primary};
`;
function Home() {
  return (
    <>
      <Test></Test>
      <Stack spacing={4} p={6} align="center">
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="xl" color="teal.500">
            Chakra UI v2 Example
          </Text>
        </Box>
        <Button colorScheme="teal">Click Me</Button>
      </Stack>
    </>
  );
}

export default Home;
