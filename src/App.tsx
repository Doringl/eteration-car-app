import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Layout from "./components/Layout/Layout";
import { carsActions, fetchCarsPageData } from "./features/cars/carsSlice";

const App = () => {
  const [carsInShoppingCart, setCarsInShoppingCart] = useState<Cars>();
  const [sortBy, setSortBy] = useState<SortType>("old-to-new");
  const dispatch = useAppDispatch();
  const { pageData, paginatedData, isFiltering, filteredData } = useAppSelector(
    (state) => state.cars
  );
  const { setPaginatedData, setCurrentPage, sort } = carsActions;

  useEffect(() => {
    /* var names = [];
    names[0] = {
      createdAt: "2022-03-30T05:50:53.201Z",
      name: "Polestar Golf",
      image: "http://placeimg.com/640/480/sports",
      price: "802.00",
      description:
        "Repudiandae minima non molestiae. Vitae in qui sed. Est voluptas facilis corrupti autem molestiae quaerat provident neque. Possimus sit minus dolor iste.\n \rVoluptas temporibus corporis autem dolores culpa omnis fugiat impedit. Ipsa et minima vel eveniet nam et eaque. Dolor ut assumenda corrupti necessitatibus enim corporis ea eos eligendi. Vel quia esse et animi.\n \rQuas rerum quas vel. Vel rerum nam minima harum est dicta deleniti illo repellendus. Velit totam earum. Nostrum ut incidunt nulla magni et quia et.",
      model: "Roadster",
      brand: "Tesla",
      id: "1",
      count: 2,
    };
    names[1] = {
      createdAt: "2022-03-30T05:50:53.201Z",
      name: "Polestar Golf",
      image: "http://placeimg.com/640/480/sports",
      price: "802.00",
      description:
        "Repudiandae minima non molestiae. Vitae in qui sed. Est voluptas facilis corrupti autem molestiae quaerat provident neque. Possimus sit minus dolor iste.\n \rVoluptas temporibus corporis autem dolores culpa omnis fugiat impedit. Ipsa et minima vel eveniet nam et eaque. Dolor ut assumenda corrupti necessitatibus enim corporis ea eos eligendi. Vel quia esse et animi.\n \rQuas rerum quas vel. Vel rerum nam minima harum est dicta deleniti illo repellendus. Velit totam earum. Nostrum ut incidunt nulla magni et quia et.",
      model: "Roadster",
      brand: "Tesla",
      id: "2",
      count: 1,
    };
    localStorage.setItem("names", JSON.stringify(names)); 
    setCarsInShoppingCart(JSON.parse(localStorage.getItem("cars") as string));
    */
    (async () => {
      await dispatch(fetchCarsPageData());
      dispatch(setPaginatedData());
    })();
  }, [dispatch, setPaginatedData]);

  console.log(carsInShoppingCart);

  return (
    <Layout>
      <Box display='flex'>
        <Container sx={{ py: 8, margin: 0 }} maxWidth='xs'>
          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Sort By</FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              value={sortBy}
              name='radio-buttons-group'
              onChange={(event) => {
                setSortBy((event.target as HTMLInputElement).value as SortType);
                dispatch(
                  sort((event.target as HTMLInputElement).value as SortType)
                );
              }}
            >
              <FormControlLabel
                value='old-to-new'
                control={<Radio />}
                label='Old to new'
              />
              <FormControlLabel
                value='new-to-old'
                control={<Radio />}
                label='New to old'
              />
              <FormControlLabel
                value='price-hight-to-low'
                control={<Radio />}
                label='Price hight to low'
              />
              <FormControlLabel
                value='price-low-to-hight'
                control={<Radio />}
                label='Price low to hight'
              />
            </RadioGroup>
          </FormControl>
        </Container>
        <Container sx={{ py: 8, margin: 0 }} maxWidth='md'>
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
                    <Typography>{`${car.price} ₺`}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant='contained'
                      endIcon={<AddShoppingCartIcon />}
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
              onChange={(event, page) => dispatch(setCurrentPage(page))}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default App;
