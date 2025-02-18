import { Flex, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react';

const travelTypes = [
  {
    id: 1,
    name: 'vida noturna',
    image: 'cocktail.svg',
  },
  {
    id: 2,
    name: 'praia',
    image: 'surf.svg',
  },
  {
    id: 3,
    name: 'moderno',
    image: 'building.svg',
  },
  {
    id: 4,
    name: 'clássico',
    image: 'museum.svg',
  },
  {
    id: 5,
    name: 'e mais...',
    image: 'earth.svg',
  },
];

export function TravelTypes() {
  const isWide = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      justify={['space-around', 'space-between']}
      m='5rem auto'
      maxW='72.5rem'
      flexWrap='wrap'
    >
      {travelTypes.map(({ id, name, image }) => (
        <Stack
          key={id}
          spacing={['0', '1.5rem']}
          align='center'
          justify='space-between'
          flexDir={['row', 'column']}
          m='1rem 2rem'
        >
          {isWide ? (
            <Image src={`/assets/TravelTypes/${image}`} w='5.3125rem' />
          ) : (
            <Image src={'/assets/TravelTypes/elipse.svg'} mr='1' />
          )}
          <Text fontWeight={['500', '600']} fontSize={['lg', '2xl']}>
            {name}
          </Text>
        </Stack>
      ))}
    </Flex>
  );
}
