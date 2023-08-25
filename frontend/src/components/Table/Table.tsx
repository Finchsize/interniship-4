const Table = ({
  headers,
  data,
}: {
  headers: string[];
  data: Array<string[]>[];
}) => (
  <table className="w-full table-auto text-left">
    <thead>
      <tr>
        {headers.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-neutral-300 last:border-none">
        <td className="py-4">1</td>
        <td>bruh</td>
        <td>135135135</td>
      </tr>
      <tr className="border-neutral-300">
        <td className="py-4">1</td>
        <td>bruh</td>
        <td>135135135</td>
      </tr>
    </tbody>
  </table>
);

export default Table;
