import React from "react";
import "./HomePage.css";
import MainContent from "../../components/MainContent/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";

const HomePage = () => {
  return (
    <div>
      <MainContent>
        <Banner />
        <section className="proximos-eventos">
          <Container>
            <div className="events-box">
              <NextEvent
                title={"Seita das Trevas"}
                description={"Erguiremos o Pelé de seu enterro!"}
                eventDate={"00h00 01/12/23"}
                idEvento={"123123123"}
              />
            </div>
          </Container>
        </section>
        <VisionSection />
        <ContactSection />
      </MainContent>
    </div>
  );
};

export default HomePage;
