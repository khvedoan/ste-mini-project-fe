import { UploadedData } from "../api-request";

function DataTable({ tableData }: { tableData: UploadedData[] }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>postId</th>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>body</th>
        </tr>
      </thead>
      <tbody data-testid="table-body">
        { tableData.map(row =>
          <tr key={row.id}>
              <td>{row.postId}</td>
              <td>{row.recordId}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.body}</td>
          </tr>) }
      </tbody>
    </table>
  );
}

export default DataTable;