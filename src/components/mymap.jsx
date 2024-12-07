import { MapContainer, ImageOverlay, } from 'react-leaflet';
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
        style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
        zoom={-2} // Start zoomed out
        minZoom={-3} // Allow zooming further out
        maxZoom={2} // Limit zooming in
        zoomSnap={0.1} // Very smooth zoom increments
        zoomDelta={0.1} // Smooth zoom buttons
        scrollWheelZoom={true} // Enable scroll wheel zoom
        wheelPxPerZoomLevel={100} // Smooth scrolling response
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
        
      </MapContainer>
    </div>
  );
};


export default MyMap;
