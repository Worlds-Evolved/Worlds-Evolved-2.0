import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';

const MyMap = () => {
  const imageUrl = "https://d.img.vision/capstone/1000001374_(2).png";

  
  const bounds = [
    [0, 0], 
    [5500, 8192],
  ];

  return (
    <div className="map-container">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        maxBounds={bounds}
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
      </MapContainer>
    </div>
  );
};

export default MyMap;