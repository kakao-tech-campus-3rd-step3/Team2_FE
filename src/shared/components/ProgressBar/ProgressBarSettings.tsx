import { Progress as ChakraProgress, Box } from '@chakra-ui/react';
import type { ProgressProps as ChakraProgressProps } from '@chakra-ui/react';

interface ProgressProps extends ChakraProgressProps {
  className?: string;
}

function Progress({ value = 0, className, ...props }: ProgressProps) {
  return (
    <Box className={className} width="100%">
      <ChakraProgress
        value={value}
        height="8px"
        borderRadius="9999px"
        bg="blackAlpha.100"
        sx={{
          '& > div:first-of-type': {
            backgroundColor: '#16a34a',
          },
        }}
        {...props}
      />
    </Box>
  );
}

export { Progress };
