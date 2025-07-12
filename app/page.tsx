import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Places from "@/components/Places";
import Service from "@/components/service";
import Awards from "@/components/Awards";
import Trips from "@/components/Trips";
import Special from "@/components/special";
import Reviews from "@/components/reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Places />
      <Service />
      <Trips />
      <Special />
      <Awards />
      <Reviews />
      <Footer />
      {/* Uncomment the line above to include the Special component */}
    </>
  );
}
