const Table = ({
  headers,
  data,
}: {
  headers: string[];
  data: Array<string>[];
}) => (
  <table className="w-full table-auto text-left">
    <thead>
      <tr>
        {headers.map((header) => (
          <th className="font-medium">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr className="border-b border-neutral-300 last:border-none">
          {row.map((cell) => (
            <td className="py-4">{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
