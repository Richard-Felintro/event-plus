import React from "react";
import Title from "../Title/Title";

const VisionSection = () => {
  return (
    <section className="vision">
      <div className="vision__box">
        <Title 
        titleText={'Visão'}
        color='white'
        additionalClass='vision__title'
        />

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt aliquid nemo vero consequatur, rerum blanditiis nobis eaque maxime qui quae amet velit labore tempora maiores voluptas quod commodi iste praesentium!
        Natus illo voluptates nobis molestias consequatur sunt dolorum labore, distinctio consequuntur, nihil possimus tempora obcaecati. Ipsa velit mollitia doloribus, consectetur totam nemo, itaque omnis, voluptatem sunt libero qui harum neque.</p>
      </div>
    </section>
  );
};

export default VisionSection;
