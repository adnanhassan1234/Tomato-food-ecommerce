"use client";
import React from "react";

const TransectionDetails = ({ options, detail, setDetail, transectionLengths }) => {
  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          className={`p-2 transection_btn ${
            detail.id === index ? "active" : ""
          }`}
          onClick={() => setDetail({ id: index, tag: option })}
        >
          <p>{option}</p>
        </div>
      ))}
    </>
  )
}

export default TransectionDetails;
