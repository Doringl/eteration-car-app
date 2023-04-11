import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Layout from "../components/Layout/Layout";
import { carsActions, fetchCarsPageData } from "../features/cars/carsSlice";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const matches1354px = useMediaQuery("(min-width:1354px)");
  const dispatch = useAppDispatch();
  const { pageData } = useAppSelector((state) => state.cars);
  const { setPaginatedData, addToCart } = carsActions;

  useEffect(() => {
    (async () => {
      await dispatch(fetchCarsPageData());
      dispatch(setPaginatedData());
    })();
  }, [dispatch, setPaginatedData]);

  const detailPageData = pageData.find((item) => item.id === id);

  return (
    <Layout>
      <Container
        sx={{ py: 8, marginLeft: matches1354px ? 23 : "auto" }}
        maxWidth='md'
      >
        {detailPageData ? (
          <Card sx={{ display: "flex" }}>
            <CardMedia
              component='img'
              image={detailPageData.image}
              alt='random'
              sx={{ objectFit: "contain" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component='div' variant='h5'>
                  {detailPageData.name}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  component='div'
                >
                  {`${detailPageData.price} ₺`}
                </Typography>
                <Typography component='div' variant='subtitle1'>
                  {detailPageData.description}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pl: 1,
                  pb: 1,
                }}
              >
                <CardActions>
                  <Button
                    variant='contained'
                    endIcon={<AddShoppingCartIcon />}
                    onClick={() => dispatch(addToCart(detailPageData))}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Box>
            </Box>
          </Card>
        ) : null}
      </Container>
    </Layout>
  );
};

export default DetailPage;
