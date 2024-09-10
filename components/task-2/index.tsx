"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { People, Homeworld } from "@/types";

const Task2 = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [loading, setLoading] = useState(true);
  const [homeworlds, setHomeworlds] = useState<Homeworld>({});

  useEffect(() => {
    const fetchPeople = async () => {
      const peopleArray = [] as People[];
      try {
        for (let i = 1; i <= 10; i++) {
          const response = await fetch(`https://swapi.dev/api/people/${i}/`);
          const data = await response.json();
          peopleArray.push({ name: data.name, homeworld: data.homeworld });
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

  const fetchHomeworld = async (homeworldUrl: string, personIndex: number) => {
    try {
      const response = await fetch(homeworldUrl);
      const data = await response.json();
      setHomeworlds((prevHomeworlds) => ({
        ...prevHomeworlds,
        [personIndex]: data.name,
      }));
    } catch (error) {
      console.error("Error fetching homeworld:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl my-4 text-center">#Task 2</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {people.map((person, index) => (
            <li key={index}>
              {person.name}
              <button
                onClick={() =>
                  fetchHomeworld(person.homeworld as string, index)
                }
                className="ml-[10px] font-bold"
              >
                +
              </button>
              {homeworlds[index] && (
                <span> - Homeworld: {homeworlds[index]}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 ml-3">
        <Link href="/task-3" className="text-2xl font-bold underline">
          Go To Task-3
        </Link>
      </div>
    </div>
  );
};

export default Task2;
