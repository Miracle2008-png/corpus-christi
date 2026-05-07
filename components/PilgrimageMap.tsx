"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths broken by Webpack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Site {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  emoji: string;
  type: string;
  location: string;
}

interface Props {
  sites: Site[];
  selected: string | null;
  onSelect: (id: string) => void;
  visited: Set<string>;
}

// Helper component to fly-to selected site
function FlyTo({ sites, selected }: { sites: Site[]; selected: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!selected) return;
    const s = sites.find(s => s.id === selected);
    if (s) map.flyTo([s.lat, s.lng], 7, { duration: 1.5 });
  }, [selected, sites, map]);
  return null;
}

export default function PilgrimageMap({ sites, selected, onSelect, visited }: Props) {
  const makeIcon = (site: Site) => {
    const isVisited = visited.has(site.id);
    const isSelected = selected === site.id;
    const bg = isVisited ? "#4caf50" : (isSelected ? site.color : "#1a2740");
    const border = isSelected ? site.color : (isVisited ? "#4caf50" : "rgba(201,168,76,0.5)");

    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: 36px; height: 36px;
          background: ${bg};
          border: 2.5px solid ${border};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer;
          transition: all 0.2s;
        ">
          <span style="transform: rotate(45deg); font-size: 14px; line-height: 1;">${site.emoji}</span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -38],
    });
  };

  return (
    <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", height: "520px" }}>
      <MapContainer
        center={[30, 15]}
        zoom={2}
        style={{ height: "100%", width: "100%", background: "#0c1525" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <FlyTo sites={sites} selected={selected} />

        {sites.map(site => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
            icon={makeIcon(site)}
            eventHandlers={{ click: () => onSelect(site.id) }}
          >
            <Popup>
              <div style={{ minWidth: "180px", fontFamily: "system-ui, sans-serif" }}>
                <p style={{ fontSize: "0.7rem", color: "#888", margin: "0 0 0.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{site.type}</p>
                <strong style={{ fontSize: "0.95rem", color: "#111" }}>{site.emoji} {site.name}</strong>
                <p style={{ fontSize: "0.8rem", color: "#666", margin: "0.2rem 0 0.5rem" }}>📍 {site.location}</p>
                <button
                  onClick={() => onSelect(site.id)}
                  style={{ background: site.color, color: "#fff", border: "none", padding: "0.35rem 0.85rem", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", width: "100%" }}
                >
                  Explore & Pray →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
