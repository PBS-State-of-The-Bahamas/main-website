import React from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

function PageTemplate({ children, pageType = "main" }) {
  return (
    <> 
        <Navbar type={pageType}/>
            <main>{children}</main>
        <Footer />
    </>
  );
}

export default PageTemplate;
