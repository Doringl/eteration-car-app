import { AccountCircle, DirectionsCar, ShoppingBag } from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getTotalPrice } from "../../features/cars/carsSlice";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { cart } = useAppSelector((state) => state.cars);
  const history = useHistory();

  const handleCartMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id='primary-search-account-menu'
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {cart.map((item) => (
        <MenuItem key={item.id}>
          <IconButton
            size='large'
            aria-label='cart item'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <DirectionsCar />
          </IconButton>
          <p>{`${item.name} ${item.count}`}</p>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          >
            Eteration Car App
          </Typography>
          <SearchBox />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size='large'
              edge='end'
              aria-label='cart'
              aria-haspopup='true'
              color='inherit'
            >
              <ShoppingBag />
              {`${getTotalPrice(useAppSelector((state) => state.cars.cart))} ₺`}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-haspopup='true'
              color='inherit'
            >
              <AccountCircle />
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                User
              </Typography>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls='primary-search-account-menu'
              aria-haspopup='true'
              onClick={handleCartMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Header;
