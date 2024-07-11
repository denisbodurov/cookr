import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Dropdown from "@mui/joy/Dropdown";

function Search() {
  return (
    <>
      <div className="flex items-center justify-between bg-backgroundLight rounded-xl px-2 mr-2 w-96 phone:w-4/5 border-solid border-2 border-highLight h-12">
        <input
          type="text"
          placeholder="Search..."
          className="h-5/6  w-5/6 rounded-xl outline-none border-0 bg-backgroundLight font-medium text-base placeholder-textLight"
        />
        <Dropdown>
          <a>
            <SearchIcon className="text-textLight"></SearchIcon>
          </a>
          <MenuButton className="p-0 border-highLight text-textLight">
            <FilterAltIcon />
          </MenuButton>
          <Menu>
            <MenuItem>Recipe</MenuItem>
            <MenuItem>Products</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default Search;
