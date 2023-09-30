import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
        <ToastContainer className="text-center" theme="colored" />
        <Component {...pageProps} />
    </AnimatePresence>
  );
}
