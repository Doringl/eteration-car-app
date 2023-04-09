import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Layout from "./components/Layout/Layout";
import { carsActions, fetchCarsPageData } from "./features/cars/carsSlice";

const App = () => {
  const matches1354px = useMediaQuery("(min-width:1354px)");

  const dispatch = useAppDispatch();
  const { pageData, paginatedData, isFiltering, filteredData } = useAppSelector(
    (state) => state.cars
  );
  const { setPaginatedData, setCurrentPage, addToCart } = carsActions;

  useEffect(() => {
    (async () => {
      await dispatch(fetchCarsPageData());
      dispatch(setPaginatedData());
    })();
  }, [dispatch, setPaginatedData]);

  return (
    <Layout>
      <Container
        sx={{ py: 8, marginLeft: matches1354px ? 27 : "auto" }}
        maxWidth='md'
      >
        {/* End hero unit */}
        <Grid container spacing={4}>
          {paginatedData.map((car) => (
            <Grid item key={car.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CardMedia component='img' image={car.image} alt='random' />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {car.name}
                  </Typography>
                  <Typography>{car.brand}</Typography>
                  <Typography>{`${car.price} ₺`}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant='contained'
                    endIcon={<AddShoppingCartIcon />}
                    onClick={() => dispatch(addToCart(car))}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{ py: 2 }}
          maxWidth='md'
        >
          <Pagination
            count={
              isFiltering
                ? filteredData.length > 11
                  ? Math.ceil(filteredData.length / 12)
                  : 1
                : pageData.length > 11
                ? Math.ceil(pageData.length / 12)
                : 1
            }
            onChange={(_, page) => dispatch(setCurrentPage(page))}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default App;
