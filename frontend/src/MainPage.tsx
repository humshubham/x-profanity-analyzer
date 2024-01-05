import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import Loader from "./Loader";
import { useAppDispatch } from "./hooks";
import { setLoading, setResults } from "./store";
import { getProfileTweets, getSearchTweets } from "./utils";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    dispatch(setLoading({ isLoading: true }));
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const method = data.get("method-radio");
    const fieldValue = data.get("field-value") as string;
    const count = parseInt(data.get("count") as string);
    if (method === "username") {
      getProfileTweets(fieldValue, count)
        .then((res) => {
          if (res.data.msg) {
            enqueueSnackbar("No results found!", {
              variant: "info",
              autoHideDuration: 2000,
            });
          } else {
            dispatch(setResults({ data: res.data }));
            navigate("/results");
          }
          dispatch(setLoading({ isLoading: false }));
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("An error occured!", {
            variant: "error",
            autoHideDuration: 2000,
          });
          dispatch(setLoading({ isLoading: false }));
        });
    } else {
      getSearchTweets(fieldValue, count)
        .then((res) => {
          if (res.data.msg) {
            enqueueSnackbar("No results found!", {
              variant: "info",
              autoHideDuration: 2000,
            });
          } else {
            dispatch(setResults({ data: res.data }));
            navigate("/results");
          }
          dispatch(setLoading({ isLoading: false }));
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("An error occured!", {
            variant: "error",
            autoHideDuration: 2000,
          });
          dispatch(setLoading({ isLoading: false }));
        });
    }
  };

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
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
          p: 12,
          borderRadius: 3,
          ml: "2rem",
          my: 12,
          boxShadow: 10,
          width: "18rem",
        }}
      >
        <Box
          sx={{
            alignItems: "stretch",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
              Twitter Profanity Analyzer
            </Typography>
            <Typography variant="body2" sx={{ color: "grey", mb: 1 }}>
              Please search by username or keyword
            </Typography>
          </Box>
          <Box>
            <Box sx={{ p: 2, flexDirection: "row" }}>
              <FormControl>
                <RadioGroup row name="method-radio" defaultValue="username">
                  <FormControlLabel
                    value="username"
                    control={<Radio />}
                    label="Username"
                  />
                  <FormControlLabel
                    value="search"
                    control={<Radio />}
                    label="Keyword"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ flexDirection: "row", mb: 1 }}>
              <TextField
                sx={{ width: "100%", mb: 3 }}
                label="Username/Keyword"
                variant="outlined"
                name="field-value"
                required
              />
            </Box>
            <Box sx={{ flexDirection: "row", mb: 4 }}>
              <TextField
                sx={{ width: "100%", mb: 3 }}
                label="No. of tweets"
                variant="outlined"
                name="count"
                type="number"
                required
              />
            </Box>
          </Box>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ width: "100%", mb: 6 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Loader />
    </Box>
  );
};

export default MainPage;
