import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function DriverHomePage() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const busNumber = "WB12A1234";
  const collegeName = "Techno India Main Campus";

  const handleLocationAccess = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError("Location access denied.");
        console.error(err);
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-blue-700">
            Bus No: {busNumber}
          </h1>
          <p className="text-gray-600">College: {collegeName}</p>
        </div>
        <button
          onClick={handleLocationAccess}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Allow Location Access
        </button>
      </div>

      {/* Map Section */}
      <div className="h-[60vh] rounded-lg overflow-hidden shadow">
        {location ? (
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={15}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={[location.lat, location.lng]}>
              <Popup>Your current location</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-center px-6">
            {error ||
              "Please allow location access to view your position on the map."}
          </div>
        )}
      </div>
    </div>
  );
}
