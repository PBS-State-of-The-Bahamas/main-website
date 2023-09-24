import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { useRouter } from 'next/router';

function PageTemplate({ children }) {
  const router = useRouter();
  return (
    <> 
      <Navbar currentUrl={router.pathname}/>
          <main>{children}</main>
      <Footer currentUrl={router.pathname}/>
    </>
  );
}

export default PageTemplate;
