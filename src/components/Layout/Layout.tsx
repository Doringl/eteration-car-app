import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import { FC, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { carsActions } from "../../features/cars/carsSlice";
import Header from "../Header/Header";

interface ILayout {
  children: ReactNode;
}
const Layout: FC<ILayout> = ({ children }) => {
  const [sortBy, setSortBy] = useState<SortType>("old-to-new");
  /* const [selectedBrand, setSelectedBrand] = useState<string>(""); */
  const matches = useMediaQuery("(min-width:900px)");

  const dispatch = useAppDispatch();
  const { pageData, isFiltering, filteredData } = useAppSelector(
    (state) => state.cars
  );
  const { sort } = carsActions;

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
      </Box>
    </>
  );
};

export default Layout;
