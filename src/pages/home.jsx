import React from "react";

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
            <p>Image/Video: DM and player interaction</p>
          </div>
          <div>
            <p>Integrate interactive maps and collaborative storytelling</p>
          </div>
        </div>
        <div>
          <div>
            <p>Image/Video: Interactive maps</p>
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