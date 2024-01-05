import Box from "@mui/material/Box";
import { useAppSelector } from "./hooks";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "username", headerName: "Username", width: 120 },
  { field: "date", headerName: "Date & Time", width: 160 },
  { field: "rawTweet", headerName: "Tweet", width: 750 },
  {
    field: "url",
    headerName: "Url",
    renderCell: (params: GridRenderCellParams) => (
      <Link rel="noopener noreferrer" target="_blank" href={params.row.url}>
        Link
      </Link>
    ),
  },
  { field: "likes", headerName: "Likes", width: 100 },
  { field: "degree", headerName: "Degree", width: 100 },
];

const Results = () => {
  const { data } = useAppSelector((state) => state.results);
  const navigate = useNavigate();
  // console.log(data);
  return (
    <Box
      style={{
        background: "linear-gradient(90deg, #520979 60%, #e300ff 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        sx={{ alignSelf: "center", fontSize: "0.7rem", mt: 4, mb: 4 }}
        onClick={() => navigate("/")}
        startIcon={<HomeIcon />}
      >
        Go to Home
      </Button>
      <DataGrid
        sx={{ p: 2, mt: 2, ml: 4, mr: 4, mb: 4, backgroundColor: "white" }}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection={false}
      />
    </Box>
  );
};

export default Results;
