import React, { Component, ReactComponentElement } from "react";
import H1 from "./H1";

function Cards() {
  var lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi elit, iaculis ac bibendum et, placerat eu leo.";
  return (
    <div className="flex flex-col items-start gap-12 self-stretch">
      <div className="flex flex-col items-start justify-center gap-4">
        <H1 text="Keep track of the game"></H1>
        <h2 className=" text-4xl font-semibold text-gray-700">
          Become a better player everyday.
        </h2>
      </div>
      <div className="flex items-start gap-16 self-stretch">
        <Card title="Patch notes" desc={lorem} icon="news"></Card>
        <Card title="Rankings" desc={lorem} icon="social_leaderboard"></Card>
        <Card title="Marketplace" desc={lorem} icon="storefront"></Card>
      </div>
    </div>
  );
}

function Card(props: { title: string; desc: string; icon: string }) {
  return (
    <div
      className="flex flex-col items-start gap-4 rounded-4xl border-2 border-solid border-black px-16 py-8"
      style={{ flex: "1 0 0" }}
    >
      <div className="flex items-center justify-center gap-2 self-stretch">
        <span className="font-icons" style={{ fontSize: "6rem" }}>
          {props.icon}
        </span>
        <H1 text={props.title}></H1>
      </div>
      <p
        className=" self-stretch py-2 text-4xl text-gray-700"
        style={{ lineHeight: "150%" }}
      >
        {props.desc}
      </p>
    </div>
  );
}

export default Cards;
