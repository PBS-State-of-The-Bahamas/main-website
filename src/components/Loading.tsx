import Lottie from "lottie-react";
import animationData from "public/lottie/inline-loading.json";

export default function Loading() {
  return (
    <Lottie
      loop
      autoPlay
      animationData={animationData}
      style={{
        height: 200,
        width: 200,
        margin: "0 auto",
      }}
    />
  );
}
