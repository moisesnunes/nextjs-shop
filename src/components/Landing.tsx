import Image from "next/image";
import React from "react";
import BuyBtn from "./Button";

function Landing() {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-10">
        <span className="text-xl font-semibold px-2">Macbook pro 2023</span>
        <h1 className="space-y-2 text-5xl font-semibold tracking-wider lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-l from-blue-500 to-violet-500 text-transparent bg-clip-text ">
            SUPERCHARGE
          </span>
          <span>FOR PROS</span>
        </h1>
        <p className="font-light text-lg leading-normal text-left max-w-xl">
          The most powerfull Macbook is here.Supercharged by M2 Pro or M2 Max,
          MacBook Pro takes its power and efficiency further than ever. It
          delivers exceptional performance whether it’s plugged in or not, and
          now has even longer battery life. Combined with a stunning Liquid
          Retina XDR display and all the ports you need — this is a pro laptop
          without equal.
        </p>
        <div className="space-x-8">
          <BuyBtn title="order now" />
          <span className="text-xl font-light link">From R$ 1999</span>
        </div>
      </div>
      <div className="relative hidden transition-all duration-500 md:inline">
        <img src="/macbook.jpg" alt="macbook"/>
      </div>
    </section>
  );
}

export default Landing;
