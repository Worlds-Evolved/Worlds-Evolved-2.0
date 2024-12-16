import React from "react";
import HomeMap from "../components/HomePageMap";
import './home.css'

const Home = () => {
  return (
    <div className="home-container">
      <img
        src="https://d.img.vision/capstone/logo_-_transparent_background.png"
        alt="Worlds Evolved Logo"
        className="logo"
      />

      <h1>Worlds Evolved</h1>
      <h2>Bring your world to life</h2>

      <div>
        <div className="row">
          <div className="text-container">
            <p>
              An innovative platform designed to transform how Dungeon Masters (DMs)
              and players interact with their game worlds.
            </p>
          </div>
          <div className="iframe-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/oNyrkW3EN5I?start=6510&end=6650&autoplay=1&mute=1&loop=1&playlist=oNyrkW3EN5I"
              title="Worlds Evolved Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="row">
          <div className="iframe-container map">
            <HomeMap />
          </div>
          <div className="text-container">
            <p>Integrate interactive maps and collaborative storytelling</p>
          </div>
        </div>

        <div className="row">
          <div className="text-container">
            <p>
              Connect players with the history, events, and mysteries that shape
              their journey all in one centralized hub.
            </p>
          </div>
          <div className="iframe-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/2MYjg0IuYpA?start=7235&end=7320&autoplay=1&mute=1&loop=1&playlist=2MYjg0IuYpA"
              title="Worlds Evolved Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="row">
          <div className="text-container">
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;