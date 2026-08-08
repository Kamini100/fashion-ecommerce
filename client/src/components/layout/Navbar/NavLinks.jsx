import {NavLink, useSearchParams} from "react-router-dom";

const links = [
  {
    name: "Men",
    path: "/products?category=men",
    category: "men",
  },
  {
    name: "Women",
    path: "/products?category=women",
    category: "women",
  },
  {
    name: "Kids",
    path: "/products?category=kids",
    category: "kids",
  },
  {
    name: "Beauty",
    path: "/products?category=beauty",
    category: "beauty",
  },
  {
    name: "Home & Living",
    path: "/products?category=home-living",
    category: "home-living",
  },
];

function NavLinks(){
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");
  return(
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
      {links.map((link)=>{
        const isCategoryActive = currentCategory === link.category;
        return(
          <NavLink
          key={link.name}
          to={link.path}
          className= {`relative font-medium transition-colors duration-200 ${
              isCategoryActive
                ? "text-pink-500"
                : "text-gray-700 hover:text-pink-500"
            }`}
        >
          {link.name}
        </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;

/*
Why NavLink instead of Link?
NavLink lets us know which page is currently active.
Added useSearchParams - This lets us read: from the URL.
*/