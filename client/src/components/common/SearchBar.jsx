import {Search} from "lucide-react";

function SearchBar(){
  return(
    <div className="flex w-full max-w-md items-center rounded-md bg-gray-100 px-4 py-2">
      <Search size={20} className="text-gray-500"  />
      <input
      type="text"
      placeholder="Search for products, brands and more"
      className="ml-3 w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-500"
      />
    </div>
  )
}

export default SearchBar;