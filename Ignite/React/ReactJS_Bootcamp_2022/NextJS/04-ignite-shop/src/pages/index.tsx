import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from './home'
import Image from 'next/image'

import camiseta1 from '@/assets/camisetas/1.png'
import camiseta2 from '@/assets/camisetas/2.png'
import camiseta3 from '@/assets/camisetas/3.png'
import camiseta4 from '@/assets/camisetas/4.png'

import 'keen-slider/keen-slider.min.css'

export default function Home(props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <pre>{JSON.stringify(props.list)}</pre>
      <Product className="keen-slider__slide">
        <Image
          src={camiseta1}
          width={0}
          height={0}
          alt=""
          style={{ width: '520px', height: '480px' }}
          priority
        />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image
          src={camiseta2}
          width={0}
          height={0}
          alt=""
          style={{ width: '520px', height: '480px' }}
          priority
        />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image
          src={camiseta3}
          width={0}
          height={0}
          alt=""
          style={{ width: '520px', height: '480px' }}
          priority
        />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image
          src={camiseta4}
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

export const getServerSideProps = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  console.log('rodou')

  return {
    props: {
      list: [1,2,3]
    }
  }
}
