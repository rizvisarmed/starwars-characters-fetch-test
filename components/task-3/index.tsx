"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";

const fetchPeople = async (pageParam = 1) => {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${pageParam}`
  );
  const data = await response.json();
  return {
    results: data.results,
    nextPage: pageParam + 1,
    hasNextPage: !!data.next,
  };
};

const Task3 = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["starWarsPeople"],
    queryFn: ({ pageParam = 1 }) => fetchPeople(pageParam),
    initialPageParam: 1,
    getNextPageParam: (result) => {
      return result.nextPage ? result.nextPage : undefined;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  return (
    <div>
      <h1 className="text-4xl my-4 text-center">#Task 3</h1>
      <ul>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map(
              (person: { name: string }, personIndex: number) => (
                <li key={personIndex}>{person.name}</li>
              )
            )}
          </React.Fragment>
        ))}
      </ul>
      <div>
        {hasNextPage ? (
          <button
            className="font-bold my-2 text-2xl"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : "Load more"}
          </button>
        ) : (
          <p>No more data to load.</p>
        )}
      </div>

      <div className="mt-4 ml-3">
        <Link href="/" className="text-2xl font-bold underline">
          Back To Task-1
        </Link>
      </div>
    </div>
  );
};

export default Task3;
