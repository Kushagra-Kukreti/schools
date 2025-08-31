"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DisplayData() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get("/api/displayData");
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold text-center mb-6">Schools</h1>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="w-32 h-5 bg-gray-300 rounded mb-2"></div>
                  <div className="w-20 h-3 bg-gray-300 rounded"></div>
                </div>
                <div className="w-full h-10 bg-gray-300 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
            >
              {school.image && (
                <div className="relative">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md text-pink-500 text-xl font-bold">
                    +
                  </button>
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-cyan-600 font-semibold uppercase">
                    ICSE
                  </span>
                  <p className="text-cyan-600 text-sm mt-2">{school.city}</p>
                  <h2 className="text-lg font-bold mt-1">{school.name}</h2>
                  <p className="text-gray-500 text-sm">{school.address}</p>
                </div>
                <button className="w-full mt-4 bg-green-500 text-white py-2 rounded-b-2xl font-semibold">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
