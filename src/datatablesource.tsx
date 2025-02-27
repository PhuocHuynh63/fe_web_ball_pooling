import { GridColDef } from "@mui/x-data-grid";

interface UserRow {
  id: string;
  img: string;
  username: string;
  email: string;
  address: string;
  status: string;
}

interface RenderCellParams {
  row: UserRow;
}

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params: RenderCellParams) => {
      return (
        <div className="cellWithImg"></div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
