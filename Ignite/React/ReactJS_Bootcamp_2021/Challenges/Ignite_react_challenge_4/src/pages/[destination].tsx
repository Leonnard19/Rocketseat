import {
  Box,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiInfo } from 'react-icons/fi';

import { CityCard } from '../components/Destination/CityCard';
import { Header } from '../components/Header';

import { destinations } from '../../destinations.json';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { destination: destinationName } = params;

  const destinationDb = destinations.find((db) => db.name === destinationName);

  const destination = {
    ...destinationDb,

    //Not Real Tho
    languages: Math.floor(Math.random() * 50),
    countries: Math.floor(Math.random() * 100),
  };

  return {
    props: {
      destination,
    },
  };
};

interface DestinationProps {
  destination: {
    name?: string;
    title: string;
    description: string;
    languages: number;
    countries: number;
    topCities: [
      {
        city: string;
        country: string;
        cityImage: string;
        countryFlag: string;
      },
    ];
    imagesURL: string[];
  };
}
export default function Destination({ destination }: DestinationProps) {
  const {
    title,
    description,
    languages,
    countries,
    imagesURL,
    topCities,
  } = destination;

  const isWide = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <Header />

      <Image
        src={imagesURL[Math.floor(Math.random() * imagesURL.length)]}
        objectFit='cover'
        h={['9.375rem', '31.25rem']}
        w='100vw'
        filter='brightness(0.8)'
      />
      <Text
        color='gray.50'
        fontSize={['1.75rem', '5xl']}
        fontWeight='600'
        mt={['-5.5rem', '-8.5rem']}
        ml={['8.5rem', '32']}
        pos='absolute'
      >
        {title}
      </Text>

      <Flex
        direction={['column', 'row']}
        mt={['6', '20']}
        mx='8.75rem'
        justify='space-between'
        align='center'
      >
        <Text
          fontSize={['sm', '2xl']}
          textAlign='justify'
          maxW={['21.4375rem', '37.5rem']}
          w='100vw'
        >
          {description}
        </Text>
        <HStack spacing='2.625rem' justify='center' mt='1rem'>
          <Flex flexDir='column' align='center'>
            <Text fontSize={['2xl', '5xl']} fontWeight='600' color='yellow.800'>
              {countries}
            </Text>
            <Text fontSize={['lg', '2xl']} fontWeight={['400', '600']}>
              países
            </Text>
          </Flex>
          <Flex flexDir='column' align='center'>
            <Text fontSize={['2xl', '5xl']} fontWeight='600' color='yellow.800'>
              {languages}
            </Text>
            <Text fontSize={['lg', '2xl']} fontWeight={['400', '600']}>
              linguas
            </Text>
          </Flex>
          <Flex
            flexDir='column'
            align={['flex-start', 'center']}
            flexShrink={0}
          >
            <Text fontSize={['2xl', '5xl']} fontWeight='600' color='yellow.800'>
              {topCities.length}
            </Text>

            <Flex align='center'>
              <Text fontSize={['lg', '2xl']} fontWeight={['400', '600']}>
                cidades + 100
              </Text>
              <Tooltip
                hasArrow
                label='Entre as 100 Melhores cidades do mundo para se conhecer!'
                bg='gray.300'
                color='black'
              >
                <Text as='span' ml='1'>
                  <FiInfo opacity={0.5} />
                </Text>
              </Tooltip>
            </Flex>
          </Flex>
        </HStack>
      </Flex>

      <Box w={['18.75rem', '72.5rem']} m={['2rem 0.5rem', '5rem auto']}>
        <Text fontSize='4xl' fontWeight='500'>
          Cidades +100
        </Text>

        {isWide ? (
          <SimpleGrid columns={[1, 4]} spacing='2.8rem' mt={['5', '20']}>
            {topCities.map((topCity) => (
              <CityCard
                key={topCity.city}
                city={topCity.city}
                country={topCity.country}
                cityImage={topCity.cityImage}
                countryFlag={topCity.countryFlag}
              />
            ))}
          </SimpleGrid>
        ) : (
          <VStack direction='column' align='flex-end' spacing='5' mb='4' mt='5'>
            {topCities.map((topCity) => (
              <CityCard
                key={topCity.city}
                city={topCity.city}
                country={topCity.country}
                cityImage={topCity.cityImage}
                countryFlag={topCity.countryFlag}
              />
            ))}
          </VStack>
        )}
      </Box>
    </>
  );
}
