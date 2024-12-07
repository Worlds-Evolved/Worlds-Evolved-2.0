import { MapContainer, ImageOverlay } from 'react-leaflet';

const MyMap = () => {
  const imageUrl = "https://d.img.vision/capstone/1000001374_(2).png";

  const aspectRatio = 8192 / 5500;

  const bounds = [
    [51.49, -0.08], 
    [51.49 + (0.02 * aspectRatio), -0.06], 
  ];

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <ImageOverlay url={imageUrl} bounds={bounds} />
    </MapContainer>
  );
};

export default MyMap;