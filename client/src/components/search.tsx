import { BorderColor } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

function Search() {
  const searchBar = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F7F3",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    width: 350,
    border: "solid",
    borderColor: "#E56B6F",
    color: "#E56B6F",
    height: 45,
  };

  const searchField = {
    height: "90%",
    color: "#E56B6F",
    width: "80%",
    borderRadius: 10,
    outline: "none",
    border: 0,
    backgroundColor: "#F9F7F3",
    fontWeight: "bolder",
    fontSize: 15,
  };

  return (
    <>
      <div style={searchBar}>
        <input type="text" placeholder="Search..." style={searchField} />
        <Dropdown>
          <MenuButton>Dashboard...</MenuButton>
          <Menu>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Dropdown>
        <a>
          <SearchIcon></SearchIcon>
        </a>
      </div>
    </>
  );
}

export default Search;
