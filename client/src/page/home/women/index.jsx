import React from "react";
import WomenDesk1 from "@/assets/Frontend_Assets/women_desk_1.mp4";
import WomenDesk2 from "@/assets/Frontend_Assets/women_desk_2.webp";
import WomenDesk3 from "@/assets/Frontend_Assets/women_desk_3.webp";
import WomenDesk4 from "@/assets/Frontend_Assets/women_desk_4.mp4";
import WomenDesk5 from "@/assets/Frontend_Assets/women_desk_5.mp4";

const WomensPage = () => {
  return (
    <div className="overflow-hidden">
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        <section className="relative flex h-screen w-full snap-start items-center justify-center">
          <video
            autoPlay
            loop
            src={WomenDesk1}
            className="z-0 h-full w-full object-cover object-top"
          ></video>
          <div className="absolute z-10 w-1/3 -translate-x-[80%] translate-y-[80%] space-y-8">
            <h1 className="text-5xl font-medium text-white">Polo Collection</h1>
            <h2 className="text-pretty text-3xl font-normal text-white">
              Shop from our wide range of polos that fit into all occasions
            </h2>
          </div>
        </section>
        <section className="relative flex h-screen w-full snap-start items-center justify-center">
          <img
            src={WomenDesk3}
            alt=""
            className="z-0 h-full w-full object-cover object-top"
          />
          <div className="absolute z-10 w-1/3 -translate-x-[80%] translate-y-[60%] space-y-8">
            <h1 className="text-5xl font-medium text-white">
              Linen Shirts Collection | Premium Linen Shirt
            </h1>
            <h2 className="text-pretty text-2xl font-normal text-white">
              Breeze through this summer in style
            </h2>
          </div>
        </section>
        <section className="relative flex h-screen w-full snap-start items-center justify-center">
          <video
            autoPlay
            loop
            src={WomenDesk4}
            className="z-0 h-full w-full object-cover object-top"
          ></video>
          <div className="absolute z-10 w-1/3 -translate-y-44 translate-x-[100%] space-y-8">
            <h1 className="text-5xl font-semibold text-slate-900">
              AirSence Set Up
            </h1>
            <h2 className="text-pretty text-2xl font-normal text-slate-900">
              Light-Weight stretchy and quich drying workwear thats fit for
              every occasion
            </h2>
          </div>
        </section>
        <section className="relative flex h-screen w-full snap-start items-center justify-center">
          <video
            autoPlay
            loop
            src={WomenDesk5}
            className="z-0 h-full w-full object-cover object-top"
          ></video>
          <div className="absolute z-10 w-1/3 -translate-x-[80%] -translate-y-[70%] space-y-8">
            <h1 className="text-5xl font-medium text-slate-900">
              Denim Collection | Wide Straight Jeans
            </h1>
            <h2 className="text-pretty text-2xl font-normal text-slate-900">
              Light 100% cotton denim that offers comfort with style
            </h2>
          </div>
        </section>
        <section className="relative flex h-screen w-full snap-start items-center justify-center">
          <img
            src={WomenDesk2}
            alt=""
            className="z-0 h-full w-full object-cover object-top"
          />
          <div className="absolute z-10 w-1/3 translate-x-[80%] translate-y-[60%] space-y-8">
            <h1 className="text-5xl font-medium text-slate-900">
              Functional Outerwears | Extra Stretch DRY-EX hoodie
            </h1>
            <h2 className="text-pretty text-2xl font-normal text-slate-900">
              High performance pieces for your active lifestyle
            </h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WomensPage;
