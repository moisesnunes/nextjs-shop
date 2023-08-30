import React from "react";
import BuyBtn from "./Button";
import Image from "next/image";

function Promo() {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-end md:justify-between px-8">
      <div className="relative h-[500px] w-[500px] hidden transition-all duration-500 md:inline">
        <img src="/watch.png" alt="" />
      </div>
      <div className="space-y-10">
        <h1 className="space-y-2 text-5xl font-semibold tracking-wider lg:text-6xl xl:text-7xl uppercase">
          <span className="block bg-gradient-to-l from-blue-500 to-violet-500 text-transparent bg-clip-text uppercase">
            All New.
          </span>
          <span>For a better you</span>
        </h1>
        <p className="font-light text-lg leading-normal text-left max-w-xl">
          The Apple Watch Hermès partnership is built on a shared foundation of
          innovation and uncompromising design. From the vibrant colors and
          exclusive faces to the fine material of the bands — every detail is
          crafted to be timeless and stunning.
        </p>
        <div className="space-x-8">
          <BuyBtn title="order now" />
          <span className="text-xl font-light link">From R$ 799</span>
        </div>
      </div>
    </section>
  );
}

export default Promo;
