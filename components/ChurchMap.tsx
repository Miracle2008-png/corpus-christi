"use client";
import { useEffect, useState } from "react";
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

interface Church {
  id: number;
  lat: number;
  lon: number;
  name: string;
  distance?: number;
}

interface Props {
  userCoords: { lat: number; lng: number };
}

// Helper component to recenter map when coords change
function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export default function ChurchMap({ userCoords }: Props) {
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const churchIcon = L.divIcon({
    className: "",
    html: `
      <div style="
        width: 30px; height: 30px;
        background: linear-gradient(135deg, var(--gold-dark), var(--gold));
        border: 2px solid #fff;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">
        <div style="transform: rotate(45deg); color: #1a1000; font-size: 14px; font-weight: bold;">✝</div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const userIcon = L.divIcon({
    className: "",
    html: `
      <div style="
        width: 20px; height: 20px;
        background: #4A90E2;
        border: 3px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(74,144,226,0.8);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  useEffect(() => {
    let isMounted = true;
    
    async function fetchChurches() {
      setLoading(true);
      setError("");
      try {
        // Overpass QL query: Find "amenity=place_of_worship" AND "religion=christian" AND "denomination=catholic" within 10km (10000 meters)
        const radius = 10000; 
        const query = `
          [out:json][timeout:25];
          (
            node["amenity"="place_of_worship"]["religion"="christian"]["denomination"="catholic"](around:${radius},${userCoords.lat},${userCoords.lng});
            way["amenity"="place_of_worship"]["religion"="christian"]["denomination"="catholic"](around:${radius},${userCoords.lat},${userCoords.lng});
          );
          out center;
        `;
        
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query
        });

        if (!response.ok) throw new Error("Failed to fetch from Overpass API");
        
        const data = await response.json();
        
        if (!isMounted) return;

        const results = data.elements.map((el: any) => ({
          id: el.id,
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
          name: el.tags?.name || "Catholic Church",
        })).filter((c: any) => c.lat && c.lon);

        setChurches(results);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Could not load nearby churches. The map service might be temporarily unavailable.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchChurches();

    return () => { isMounted = false; };
  }, [userCoords]);

  return (
    <div style={{ position: "relative", width: "100%", height: "500px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(26,39,68,0.1)", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
      <MapContainer
        center={[userCoords.lat, userCoords.lng]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapRecenter lat={userCoords.lat} lng={userCoords.lng} />

        {/* User's Location */}
        <Marker position={[userCoords.lat, userCoords.lng]} icon={userIcon}>
          <Popup>
            <div style={{ textAlign: "center", fontWeight: "bold" }}>You are here</div>
          </Popup>
        </Marker>

        {/* Catholic Churches */}
        {churches.map((church) => (
          <Marker key={church.id} position={[church.lat, church.lon]} icon={churchIcon}>
            <Popup>
              <div style={{ textAlign: "center", minWidth: "150px" }}>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "var(--navy-dark)" }}>{church.name}</h3>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${church.lat},${church.lon}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block", padding: "6px 12px", background: "var(--gold)", 
                    color: "#1a1000", textDecoration: "none", borderRadius: "4px", fontSize: "12px", fontWeight: "bold"
                  }}
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Loading Overlay */}
      {loading && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "4px solid rgba(201,168,76,0.3)", borderTopColor: "var(--gold)", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "1rem" }} />
          <p style={{ fontWeight: 600, color: "var(--navy-dark)" }}>Searching for Catholic Churches...</p>
        </div>
      )}

      {/* Error Overlay */}
      {error && !loading && churches.length === 0 && (
        <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "rgba(220,53,69,0.9)", color: "white", padding: "10px 20px", borderRadius: "8px", zIndex: 1000, fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}>
          {error}
        </div>
      )}

      {/* No Results Overlay */}
      {!loading && churches.length === 0 && !error && (
        <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "rgba(26,39,68,0.9)", color: "white", padding: "10px 20px", borderRadius: "8px", zIndex: 1000, fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}>
          No Catholic churches found within 10km.
        </div>
      )}
    </div>
  );
}
