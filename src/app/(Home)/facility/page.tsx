import { FacilityCard } from "@/components";
import Image from "next/image";

function Facility() {
  return (
    <>
      <section className="Container pt-[4rem]">
        <p className={`text-[2.5rem] sm:text-[4rem] md:text-[6rem] font-bold text-center`}>
          FACILITIES
        </p>
        <p className={`text-[2rem] md:text-[2.5rem] text-center`}>
          We want your stay here to be truly unforgettable. That is
          why we give special attention to all of your needs so that we can
          ensure an experience quite unique.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4 my-8">
          <FacilityCard img="/assets/Image/gym.png" text="the gym"/>
          <FacilityCard img="/assets/Image/pool.png" text="swimming pool"/>
          <FacilityCard img="/assets/Image/laundry.png" text="laundry"/>
        </div>
      </section>
    </>
  );
}

export default Facility;
