import { HomeContainer, Product } from './home'
import Image from 'next/image'

import camiseta1 from '@/assets/camisetas/1.png'
import camiseta2 from '@/assets/camisetas/2.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image
          src={camiseta1}
          width={0}
          height={0}
          alt=""
          priority
          style={{ width: '520px', height: '480px' }}
        />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image
          src={camiseta2}
          width={0}
          height={0}
          alt=""
          style={{ width: '520px', height: '480px' }}
        />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
