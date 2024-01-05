import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "./hooks";

const Loader = () => {
  const { isLoading } = useAppSelector((state) => state.loader);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
