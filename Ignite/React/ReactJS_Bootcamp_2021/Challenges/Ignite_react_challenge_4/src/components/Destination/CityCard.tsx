import { Flex, Image, Text } from '@chakra-ui/react';

interface CityCardProps {
  city: string;
  country: string;
  cityImage: string;
  countryFlag: string;
}
export function CityCard({
  city,
  country,
  cityImage,
  countryFlag,
}: CityCardProps) {
  return (
    <Flex
      flexDir='column'
      flexShrink={0}
      w='64'
      h='17.4375rem'
      border='1px solid'
      borderColor='yellow.800'
      borderRadius='base'
      background='#FFF'
    >
      <Image src={cityImage} w='16rem' h='10.8125rem' objectFit='cover' />
      <Flex flex='1' justify='space-between' align='center' m='6'>
        <Flex flexDir='column'>
          <Text fontSize='xl' fontWeight='600' fontFamily='Barlow'>
            {city}
          </Text>
          <Text
            fontSize='md'
            fontWeight='600'
            fontFamily='Barlow'
            color='gray.400'
            mt='3'
          >
            {country}
          </Text>
        </Flex>

        <Image boxSize='1.875rem' borderRadius='full' src={countryFlag} />
      </Flex>
    </Flex>
  );
}
