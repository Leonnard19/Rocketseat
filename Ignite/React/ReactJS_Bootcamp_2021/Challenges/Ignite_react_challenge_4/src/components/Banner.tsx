import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';

export function Banner() {
  const isWide = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex justify='space-around'>
      <Image
        src='/assets/banner.png'
        h={['10.1875rem', '10.1875rem', '21rem']}
        w='100vw'
        pos='absolute'
        l='0'
        r='0'
        zIndex='-1'
      />
      <Stack spacing={['1', '1', '5']} mt={['1.75rem', '1.75rem', '20']}>
        <Text
          w={['100vw', '100vw', '26.625rem']}
          p={['0.5rem 1rem', '0']}
          fontWeight='500'
          fontSize={['xl', 'xl', '4xl']}
          color='gray.50'
        >
          5 Continentes,
          <Text as='span' d='block'>
            infinitas possibilidades.
          </Text>
        </Text>

        {isWide ? (
          <Text w='32.75rem' p='0' fontSize='xl' color='gray.100'>
            Chegou a hora de tirar do papel a viagem que você
            <Text as='span' display='block'>
              sempre sonhou.
            </Text>
          </Text>
        ) : (
          <Text w='100vw' p='0rem 1rem' fontSize='sm' color='gray.100'>
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        )}
      </Stack>

      {isWide && (
        <Image
          src='/assets/airplane.svg'
          w='26rem'
          mt='20'
          transform='rotate(3deg)'
        />
      )}
    </Flex>
  );
}
