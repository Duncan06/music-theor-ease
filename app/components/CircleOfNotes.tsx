"use client";
import React, { useEffect, useState } from "react";
import { Note, getCircleOfFifthsNotes } from "../utils/musicLogic";

interface CircleOfNotesProps {
  circleType?: string;
}

const circleCoordinateX: number = 150;
const circleCoordinateY: number = 150;
const circleWidth: number = 300;
const circleHeight: number = 300;
const circleRadius: number = 100;
const radiusOffset: number = circleRadius + 20;
const degreesToRadians: number = Math.PI / 180;
let angleIncrement: number = 0;

const CircleOfNotes: React.FC<CircleOfNotesProps> = ({ circleType }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Note[] = await getCircleOfFifthsNotes();
      angleIncrement = 360 / data.length;

      if (circleType === "fourths") {
        const reversedData: Note[] = data.slice().reverse();
        setNotes(reversedData);
      } else {
        setNotes(data);
      }
    };

    // Fetch data asynchronously and update state
    fetchData();
  }, [circleType]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={circleWidth}
      height={circleHeight}
    >
      <circle
        cx={circleCoordinateX}
        cy={circleCoordinateY}
        r={circleRadius}
        fill="#f0f0f0"
        stroke="#333"
        strokeWidth="2"
      />

      {/* Text labels for each key on the outer rim */}
      {notes.map((note, index) => {
        const angle = (index - 3) * angleIncrement * degreesToRadians;
        const x = circleCoordinateX + radiusOffset * Math.cos(angle);
        const y = circleCoordinateY + radiusOffset * Math.sin(angle);

        return (
          <text
            key={index}
            x={x}
            y={y}
            fill="text-primary"
            className="text-primary" // Use inline style with dynamic color class
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {note}
          </text>
        );
      })}
    </svg>
  );
};

export default CircleOfNotes;
