import React from "react";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Appointment from "./Appointment";

const Home = () => {
  return (
    <div>
      <Hero />
      <Appointment />
      <About />
      <Services />
      <Testimonials />
    </div>
  );
};

export default Home;
