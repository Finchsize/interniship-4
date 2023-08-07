export function Navbar(props: { names: string[] }) {
  return (
    <div className="flex items-center gap-16">
      {props.names.map((name, key) => {
        return (
          <a key={key} href="/">
            <p className=" text-3xl text-neutral-700">{name}</p>
          </a>
        );
      })}
    </div>
  );
}
