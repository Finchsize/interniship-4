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
      <div className="space-y-4">
        <p className="text-lg font-semibold">Top Nobility</p>
        <Table
          headers={["Place", "Name", "Donations amount"]}
          data={[
            ["1", "bruh", "1414134134"],
            ["1", "bruh", "1414134134"],
            ["1", "bruh", "1414134134"],
          ]}
        />
      </div>
    </div>
  );
};

export default Rankings;
