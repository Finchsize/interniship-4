import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import H1 from "./H1";

function Header() {
  return (
    <header className="flex w-full items-center justify-between self-stretch">
      <H1 key="logo" text="Dragon's Nest CO"></H1>
      <Navbar names={["Patch notes", "Rankings", "Marketplace"]}></Navbar>
      <Right></Right>
    </header>
  );
}

function Navbar(props: { names: string[] }) {
  return (
    <div className="flex items-center gap-16">
      {props.names.map((name, index) => {
        return <p className=" text-3xl text-neutral-700"> {name}</p>;
      })}
    </div>
  );
}

function Right() {
  return (
    <div
      className="flex items-center justify-end gap-8"
      style={{ width: "34rem" }}
    >
      <Status></Status>
      <span className="font-icons text-6xl">account_circle</span>
    </div>
  );
}

function Status() {
  return (
    <div className="flex items-center gap-6 rounded-2.5xl border-x border-y border-solid border-black px-6 py-4">
      <div className="flex items-center gap-2 text-green-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <circle cx="8" cy="8.5" r="8" fill="#038700" />
        </svg>
        <p className=" text-xl">Online</p>
      </div>
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <path
            d="M8 8.5C9.06087 8.5 10.0783 8.07857 10.8284 7.32843C11.5786 6.57828 12 5.56087 12 4.5C12 3.43913 11.5786 2.42172 10.8284 1.67157C10.0783 0.921427 9.06087 0.5 8 0.5C6.93913 0.5 5.92172 0.921427 5.17157 1.67157C4.42143 2.42172 4 3.43913 4 4.5C4 5.56087 4.42143 6.57828 5.17157 7.32843C5.92172 8.07857 6.93913 8.5 8 8.5ZM10.6667 4.5C10.6667 5.20724 10.3857 5.88552 9.88562 6.38562C9.38552 6.88572 8.70724 7.16667 8 7.16667C7.29276 7.16667 6.61448 6.88572 6.11438 6.38562C5.61428 5.88552 5.33333 5.20724 5.33333 4.5C5.33333 3.79276 5.61428 3.11448 6.11438 2.61438C6.61448 2.11428 7.29276 1.83333 8 1.83333C8.70724 1.83333 9.38552 2.11428 9.88562 2.61438C10.3857 3.11448 10.6667 3.79276 10.6667 4.5ZM16 15.1667C16 16.5 14.6667 16.5 14.6667 16.5H1.33333C1.33333 16.5 0 16.5 0 15.1667C0 13.8333 1.33333 9.83333 8 9.83333C14.6667 9.83333 16 13.8333 16 15.1667ZM14.6667 15.1613C14.6653 14.8333 14.4613 13.8467 13.5573 12.9427C12.688 12.0733 11.052 11.1667 8 11.1667C4.94667 11.1667 3.312 12.0733 2.44267 12.9427C1.53867 13.8467 1.336 14.8333 1.33333 15.1613H14.6667Z"
            fill="black"
          />
        </svg>
        <p className=" mr-6 text-xl">110</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <path
            d="M1.38106 2.63876H14.6169L7.99897 14.3613L1.38106 2.63876ZM0.342014 4.0482L6.95992 15.7686C7.08944 15.9983 7.24916 16.1824 7.42838 16.3086C7.60759 16.4347 7.80214 16.5 7.99897 16.5C8.1958 16.5 8.39035 16.4347 8.56956 16.3086C8.74878 16.1824 8.9085 15.9983 9.03802 15.7686L15.6559 4.0482C16.4369 2.66442 15.8022 0.500001 14.6169 0.500001H1.38106C1.11579 0.499648 0.856073 0.61782 0.633015 0.840364C0.409956 1.06291 0.233013 1.38039 0.123373 1.75479C0.0137337 2.1292 -0.0239541 2.54465 0.014823 2.9514C0.0536002 3.35814 0.167198 3.73894 0.342014 4.0482Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}

export default Header;
