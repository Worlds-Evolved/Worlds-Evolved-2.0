import React from "react";
import HomeMap from "../components/HomePageMap";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <img
        src="https://d.img.vision/capstone/logo_-_transparent_background.png"
        alt="Worlds Evolved Logo"
        style={{
          height: "22vh",
          width: "auto",
          marginBottom: "1vh",
        }}
      />

      <h1>Worlds Evolved</h1>
      <h2>Bring your world to life</h2>
      <div>
        <p>
          An innovative platform designed to transform how Dungeon Masters (DMs)
          and players interact with their game worlds.
        </p>
        <div>
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/oNyrkW3EN5I?start=6510&end=6650&autoplay=1&mute=1&loop=1&playlist=oNyrkW3EN5I"
              title="Worlds Evolved Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <p>Integrate interactive maps and collaborative storytelling</p>
          </div>
        </div>
        <div>
          <div>
            <p><HomeMap /></p>
          </div>
          <div>
            <p>Image/Video: Storytelling</p>
          </div>
        </div>
        <p>
          Connect players with the history, events, and mysteries that shape
          their journey all in one centralized hub.
        </p>
      </div>
    </div>
  );
};

export default Home;