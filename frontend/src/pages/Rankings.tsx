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
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Donations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>bruh</td>
            <td>135135135</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;
