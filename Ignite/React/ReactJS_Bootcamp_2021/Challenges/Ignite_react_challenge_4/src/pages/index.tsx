import { Divider, Flex, Image, Link, Text } from '@chakra-ui/react';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Navigation, Pagination]);

import { Banner } from '../components/Banner';
import { Header } from '../components/Header';
import { TravelTypes } from '../components/TravelTypes';

import { destinations } from '../../destinations.json';

export default function Home() {
  return (
    <>
      <Header />

      <Banner />

      <TravelTypes />

      <Divider
        border={['1px solid ', '2px solid']}
        w='5.625rem'
        m='0 auto'
        opacity='1'
        borderColor='gray.800'
      />

      <Text textAlign='center' m='3.25rem' fontSize='4xl'>
        Vamos nessa?
        <Text as='span' d='block'>
          Então escolha seu continente
        </Text>
      </Text>

      <Flex
        align='center'
        justify='center'
        w={['100vw', '77.5rem']}
        h={['15.625rem', '28.125rem']}
        m='0 auto'
        mb='1.5rem'
        overflow='hidden'
        borderRadius={['1', '2rem']}
      >
        <Swiper pagination={{ clickable: true }} navigation>
          {destinations.map((destination) => (
            <SwiperSlide key={destination.id}>
              <Link as='a' href={`/${destination.name}`}>
                <Image
                  src={
                    destination.imagesURL[
                      Math.floor(Math.random() * destination.imagesURL.length)
                    ]
                  }
                  objectFit='cover'
                  pos='relative'
                  filter='brightness(0.5)'
                  w={['100vw', '77.5rem']}
                  h={['15.625rem', '28.125rem']}
                />
                <Flex
                  flexDir='column'
                  textAlign='center'
                  pos='absolute'
                  width='100%'
                  top='50%'
                >
                  <Text
                    fontWeight='700'
                    fontSize={['2xl', '5xl']}
                    color='gray.50'
                  >
                    {destination.title}
                  </Text>
                  <Text
                    fontWeight='700'
                    fontSize={['sm', '2xl']}
                    color='gray.100'
                  >
                    {destination.subtitle}
                  </Text>
                </Flex>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </>
  );
}
