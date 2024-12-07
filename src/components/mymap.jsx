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
        zoom={-1} // Start zoomed out
        minZoom={-2} // Allow zooming further out
        maxZoom={2} // Limit how far you can zoom in
        zoomSnap={0.5} // Enable finer zoom levels
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
      </MapContainer>
    </div>
  );
};

export default MyMap;