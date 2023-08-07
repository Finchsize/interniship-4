export function Navbar(props: { names: string[] }) {
  return (
    <div className="flex items-center gap-16">
      {props.names.map((name, index) => {
        return <p className=" text-3xl text-neutral-700">{name}</p>;
      })}
    </div>
  );
}
