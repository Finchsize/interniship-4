export function Card(props: { title: string; desc: string; icon: string }) {
  return (
    <div
      className="flex flex-col items-start gap-4 rounded-4xl border-2 border-solid border-black px-16 py-8"
      style={{ flex: "1 0 0" }}
    >
      <div className="flex items-center justify-center gap-2 self-stretch">
        <span className="font-icons" style={{ fontSize: "6rem" }}>
          {props.icon}
        </span>
        <h1 className=" text-6xl font-semibold">{props.title}</h1>
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
