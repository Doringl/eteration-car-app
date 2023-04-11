import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import { FC, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { carsActions, getTotalPrice } from "../../features/cars/carsSlice";
import Header from "../Header/Header";

interface ILayout {
  children: ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  const [sortBy, setSortBy] = useState<SortType>("old-to-new");
  /* const [selectedBrand, setSelectedBrand] = useState<string>(""); */
  const matches = useMediaQuery("(min-width:900px)");

  const dispatch = useAppDispatch();
  const { pageData, isFiltering, filteredData, cart } = useAppSelector(
    (state) => state.cars
  );
  const { sort, addToCart, removeFromCart } = carsActions;

  /* const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name !== selectedBrand) {
      setSelectedBrand(event.target.name);
    } else {
      setSelectedBrand("");
    }
  }; */

  return (
    <>
      <Header />
      <Box display='flex'>
        <Stack
          sx={{ py: 8, marginLeft: 8, display: matches ? "flex" : "none" }}
          spacing={2}
          minWidth={200}
        >
          <FormControl
            style={{
              padding: 8,
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              borderRadius: 4,
            }}
          >
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
          {/* <FormControl>
            <FormLabel>Brands</FormLabel>
            <SearchBox type='brands' />
            <FormGroup>
              {isFiltering
                ? filteredData.map((car) => (
                    <FormControlLabel
                      key={car.id}
                      control={
                        <Checkbox
                          checked={selectedBrand === car.brand}
                          onChange={handleChange}
                          name={car.brand}
                        />
                      }
                      label={car.brand}
                    />
                  ))
                : pageData.map((car) => (
                    <FormControlLabel
                      key={car.id}
                      control={
                        <Checkbox
                          checked={selectedBrand === car.brand}
                          onChange={handleChange}
                          name={car.brand}
                        />
                      }
                      label={car.brand}
                    />
                  ))}
            </FormGroup>
          </FormControl> */}
        </Stack>
        {children}
        <Stack
          sx={{
            py: 8,
            marginRight: 8,
            display: matches ? "flex" : "none",
            minWidth: 300,
          }}
          spacing={2}
        >
          {cart.map((item) => (
            <Stack
              direction='row'
              key={`${item.id}_${item.name}`}
              style={{
                boxShadow:
                  "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
                borderRadius: 4,
                padding: 4,
              }}
              justifyContent='space-between'
            >
              <Stack direction='column'>
                <Typography
                  variant='h6'
                  noWrap
                  component='h6'
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant='h6'
                  noWrap
                  component='h6'
                  color='#1976d2'
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {`${item.price} ₺`}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center'>
                <IconButton
                  color='primary'
                  aria-label='remove'
                  component='label'
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant='h6'
                  noWrap
                  component='h6'
                  color='#1976d2'
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {item.count}
                </Typography>
                <IconButton
                  color='primary'
                  aria-label='add'
                  component='label'
                  onClick={() => dispatch(addToCart(item))}
                >
                  <AddIcon />
                </IconButton>
              </Stack>
            </Stack>
          ))}
          <Stack
            direction='row'
            style={{
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
              borderRadius: 4,
              padding: 4,
            }}
            justifyContent='space-between'
          >
            <Typography
              variant='h6'
              noWrap
              component='h6'
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {`Sepet toplamı: ${getTotalPrice(
                useAppSelector((state) => state.cars.cart)
              )} ₺`}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Layout;
