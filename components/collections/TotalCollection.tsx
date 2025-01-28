import React, { useEffect, useState } from "react";

// แสดงจำนวนคอลเลคชั่นทั้งหมด
const TotalCollections = () => {
  const [totalCollections, setTotalCollections] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/collections");
        if (!response.ok) throw new Error("Failed to fetch collections");
        const data = await response.json();
        if (data.totalCollections !== undefined) {
          setTotalCollections(data.totalCollections);
        } else {
          throw new Error("Missing total collections data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    fetchCollections();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">คอลเลคชั่นทั้งหมด</h3>
      <div className="text-3xl font-bold mt-2">
        {totalCollections !== null ? totalCollections : "Loading..."}
      </div>
    </div>
  );
};

export default TotalCollections;