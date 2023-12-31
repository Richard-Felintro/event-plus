import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./HomePage.css";
import MainContent from "../../components/MainContent/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";

const HomePage = () => {
  useEffect(() => {
    async function getProximosEventos() {
      try {
        const promise = await api.get("/Evento/ListarProximos");
        setNextEvents(promise.data);
      } catch (error) {}
    }
    getProximosEventos();
  }, []);
  // Mock API
  const [nextEvents, setNextEvents] = useState([]);

  return (
    <div>
      <MainContent>
        <Banner />
        <section className="proximos-eventos">
          <Container>
            <div className="events-box">
              {/* <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              > */}
                {nextEvents.map((e) => {
                  return (
                    // <SwiperSlide>
                      <NextEvent
                        title={e.nomeEvento}
                        description={e.descricao}
                        eventDate={e.dataEvento}
                        idEvento={e.idEvento}
                      />
                    // </SwiperSlide>
                  );
                })}
              {/* </Swiper> */}
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
