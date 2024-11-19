import { RoomDescComp } from "@/components";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <section className="Container pt-[4rem]">
        <p className={`text-[2rem] sm:text-[2.5rem] md:text-[3.6rem] text-center`}>
          All our room types are including complementary breakfast
        </p>
        <RoomDescComp
          img="/assets/Image/steven-ungermann.png"
          title="Luxury redefined"
          text="Our rooms are designed to transport you into an environment made
                for leisure. Take your mind off the day-to-day of home life and
                find a private paradise for yourself."
        />
        <RoomDescComp
          img="/assets/Image/andrew-ruiz.png"
          title="Leave your worries in the sand"
          text="We love life at the beach. Being close to the ocean with access to
          endless sandy beach ensures a relaxed state of mind. It seems like
          time stands still watching the ocean."
        />
      </section>
    </div>
  );
}
