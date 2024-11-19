import { RoomCard } from "@/features/rooms/components";
import React from "react";

export default function Rooms() {
  return (
    <>
      <section className="Container pt-[4rem]">
        <p className={`text-[2.5rem] sm:text-[4rem] md:text-[6rem] font-bold text-center`}>
          ROOMS AND RATES
        </p>
        <p className={`text-[2rem] md:text-[2.5rem] text-center`}>
          Each of our bright, light-flooded rooms come with everything you could
          possibly need for a comfortable stay. And yes, comfort isn’t our only
          objective, we also value good design, sleek contemporary furnishing
          complemented by the rich tones of nature.
        </p>
      </section>
      <section className="Container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4 my-8">
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
      </section>
    </>
  );
}
