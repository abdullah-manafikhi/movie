import React from "react";

function Skeleton() {
  const test = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 111, 1, 1, 1];

  return (
    <div className="grid gap-y-4">
      {test.map((x, index) => (
        <span
          key={index}
          className="w-full bg-gray-400 opacity-20 animate-pulse rounded-md"
        >
          .
        </span>
      ))}
    </div>
  );
}

export default Skeleton;
