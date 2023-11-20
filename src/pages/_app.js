import NavBar from '@/components/navbar'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '@/context/cartcontext'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
        <CartProvider>
      <NavBar/>
      <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}
