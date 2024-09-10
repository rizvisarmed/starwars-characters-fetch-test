"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { People } from "@/types";

export default function Task1() {
  const [people, setPeople] = useState<People[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      const peopleArray = [] as People[];
      try {
        for (let i = 1; i <= 10; i++) {
          const response = await fetch(`https://swapi.dev/api/people/${i}/`);
          const data = await response.json();
          peopleArray.push({
            name: data.name,
          });
        }
        setPeople(peopleArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div>
      <h1 className="text-4xl my-4 text-center font-bold">#Task 1</h1>
      <h1>Star Wars Characters</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {people.map((person, index) => (
            <li key={index}>{person.name}</li>
          ))}
        </ul>
      )}
      <div className="mt-4 ml-3">
        <Link href="/task-2" className="text-2xl font-bold underline">
          Go To Task-2
        </Link>
      </div>
    </div>
  );
}
