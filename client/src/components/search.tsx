import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      const url = `/recipes?name=${encodeURIComponent(searchTerm)}`;
      window.location.href = url;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-backgroundLight rounded-xl px-2 mr-2 w-96 phone:w-4/5 border-solid border-2 border-highLight h-12">
        <input
          type="text"
          placeholder="Search..."
          className="h-5/6  w-full rounded-xl outline-none border-0 bg-backgroundLight font-medium text-base placeholder-textLight"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          <SearchIcon className='text-highLight'/>
        </button>
      </div>
    </>
  );
}

export default Search;
