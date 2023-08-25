import Table from "../components/Table";

const Rankings = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-2xl font-semibold">Rankings</p>
        <p className="text-lg text-neutral-700">
          See how you compare to other players.
        </p>
      </div>
      <p className="text-lg font-semibold">Top Nobility</p>
      <Table headers={["Place", "Name", "Donations amount"]} data={[]} />
    </div>
  );
};

export default Rankings;
