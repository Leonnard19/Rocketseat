import { useRouter } from 'next/router';
import { IconButton, Image, Flex, Link } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export function Header() {
  const { asPath } = useRouter();

  return (
    <Flex
      as='header'
      align='center'
      justify='space-around'
      w='100%'
      h={['3,125rem', '6.25rem']}
    >
      {asPath !== '/' && (
        <Link as='a' href='/'>
          <IconButton
            aria-label='Voltar'
            bg='gray.50'
            icon={<FiChevronLeft />}
          />
        </Link>
      )}

      <Link as='a' href='/'>
        <Image src='/logo.svg' alt='logo' h={['1.25rem', '12']} />
      </Link>

      {asPath !== '/' && (
        <IconButton
          aria-label='Avançar'
          bg='gray.50'
          icon={<FiChevronRight />}
          disabled
        />
      )}
    </Flex>
  );
}
