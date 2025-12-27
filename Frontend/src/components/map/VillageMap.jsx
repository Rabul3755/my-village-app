import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const { BaseLayer } = LayersControl;

const JATH_CENTER = [17.0389, 75.1773];

const villageLandmarks = [
  { id: 1, name: "Village Temple", position: [17.0392, 75.1775], type: "Temple" },
  { id: 2, name: "Primary School", position: [17.0387, 75.1781], type: "School" },
  { id: 3, name: "Health Center", position: [17.0383, 75.1768], type: "Hospital" },
  { id: 4, name: "Market Area", position: [17.0398, 75.1761], type: "Market" },
  { id: 5, name: "Community Park", position: [17.0379, 75.1788], type: "Park" },
  { id: 6, name: "Panchayat Office", position: [17.0385, 75.1772], type: "Office" },
];

const Recenter = ({ center }) => {
  const map = useMap();
  map.flyTo(center, map.getZoom(), { animate: true, duration: 0.8 });
  return null;
};

const VillageMap = ({ issues = [], center = JATH_CENTER, zoom = 15, onIssueSelect, viewMode = "issues" }) => {
  const isValidLocation = (loc) =>
    Array.isArray(loc) && loc.length === 2 && typeof loc[0] === "number" && typeof loc[1] === "number";

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
      <LayersControl position="topright">
        <BaseLayer checked name="Default Map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        <BaseLayer name="Satellite View">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </BaseLayer>
      </LayersControl>

      <Recenter center={center} />

      {viewMode === "village" &&
        villageLandmarks.map((lm) => (
          <Marker key={lm.id} position={lm.position}>
            <Popup>
              <strong>{lm.name}</strong>
              <br />Type: {lm.type}
            </Popup>
          </Marker>
        ))}

      {viewMode === "issues" &&
        issues
          .filter((issue) => isValidLocation(issue.coordinates))
          .map((issue, i) => (
            <Marker
              key={i}
              position={issue.coordinates}
              eventHandlers={{ click: () => onIssueSelect(issue) }}
            >
              <Popup>
                <strong>{issue.title}</strong>
                <br />{issue.description}
              </Popup>
            </Marker>
          ))}
    </MapContainer>
  );
};

export default VillageMap;
