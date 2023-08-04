import React from "react";
import background from "../Images/co-background.jpg";
import H1 from "./H1";

function About() {
  return (
    <div className="flex items-start gap-16 self-stretch">
      <div
        className="flex w-1/2 flex-col items-start gap-16 self-stretch"
        style={{ flex: "1 0 0" }}
      >
        <div className="flex flex-col items-start justify-center gap-4">
          <H1 text="About"></H1>
          <p
            className=" self-stretch text-left text-4xl text-gray-700"
            style={{ lineHeight: "150%" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi
            elit, iaculis ac bibendum et, placerat eu leo. Aliquam erat
            volutpat. In varius, libero et fermentum facilisis, nisi dui laoreet
            nisl, sed lacinia ipsum mi id ligula.
          </p>
        </div>
        <button className="flex items-start rounded-4xl bg-orange-600 px-16 py-8 text-4xl font-semibold text-white">
          Download Now
        </button>
      </div>
      <div
        className=" image w-full rounded-4xl"
        style={{
          flex: "1 0 0",
          height: "36rem",
          background: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      ></div>
    </div>
  );
}

export default About;
