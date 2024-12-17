import { MapContainer, ImageOverlay, } from 'react-leaflet';
import L from 'leaflet';

const HomeMap = () => {
  const imageUrl = "https://d.img.vision/capstone/Copy_of_Uldenhiem.png";
  const bounds = [
    [0, 0],
    [5500, 8192],
  ];

  const maxBounds = [
    [0, 0],  // Southwest coordinates
    [5500, 8192]  // Northeast coordinates
  ];

  const center = [
    (bounds[0][0] + bounds[1][0]) / 2,
    (bounds[0][1] + bounds[1][1]) / 2,
  ];
  
  return (
    <div className="home-map-container">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        center={center}
        style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
        zoom={-2} // Start zoomed out
        minZoom={-3} // Allow zooming further out
        maxZoom={2} // Limit zooming in
        zoomSnap={0.1} // Very smooth zoom increments
        zoomDelta={0.1} // Smooth zoom buttons
        scrollWheelZoom={true} // Enable scroll wheel zoom
        wheelPxPerZoomLevel={100} // Smooth scrolling response
        maxBounds={maxBounds} // Set the max bounds to restrict map panning
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
        
      </MapContainer>
    </div>
  );
};


export default HomeMap;