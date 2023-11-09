import React, { useEffect, useState } from "react";
import "./HomePage.css";
import MainContent from "../../components/MainContent/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import axios from "axios";

const HomePage = () => {
  // useEffect(() => {
  //   // Chamar a API
  //   async function getProximosEventos() {
  //     try {
  //       const promise = await axios.get(
  //         "http://localhost:5000/api/Evento/ListarProximos"
  //       );
  //       console.log(promise.data)
  //       setNextEvents(promise.data)
  //     } catch (error) {}
  //   }
  //   getProximosEventos()

  //   console.log("A home foi montada");
  // }, []);
  // Mock API
  const [nextEvents, setNextEvents] = useState();

  return (
    <div>
      <MainContent>
        <Banner />
        <section className="proximos-eventos">
          <Container>
            <div className="events-box">
              {nextEvents.map((e) => {
                return (
                  <NextEvent
                    title={e.title}
                    description={e.description}
                    eventDate={e.date}
                    idEvento={e.id}
                  />
                );
              })}
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
