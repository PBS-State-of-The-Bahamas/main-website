import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {motion, AnimatePresence} from 'framer-motion'
import {useRouter} from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return <AnimatePresence>
    <motion.div
      key={router.route}
      initial="initialState"
      animate="animateState"
      exit="exitState"
      transition={{
          duration: 0.5,
          ease: "circInOut"
      }}
      variants={{
        initialState: {
          opacity: 0,
          clipPath: 'polygon(0 0, 6% 0, 6% 100%, 0 100%)',

        },
        animateState:{
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
        },
        exitState:{
          opacity: 0,
          clipPath: 'polygon(100% 0, 100% 0, 6% 100%, 6% 100%)',
        }
      }}
      >
      <Component {...pageProps} />
    </motion.div>
  </AnimatePresence>;
}
