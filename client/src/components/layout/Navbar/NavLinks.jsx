import {NavLink} from "react-router-dom";

const links = [
  {
    name: "Men",
    path: "/products?category=men",
  },
  {
    name: "Women",
    path: "/products?category=women",
  },
  {
    name: "Kids",
    path: "/products?category=kids",
  },
  {
    name: "Beauty",
    path: "/products?category=beauty",
  },
  {
    name: "Home & Living",
    path: "/products?category=home-living",
  },
];

function NavLinks(){
  return(
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
      {links.map((link)=>(
        <NavLink
        key={link.name}
        to={link.path}
        className= "font-medium text-gray-700 hover:text-pink-500 transition-colors duration-200"
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

export default NavLinks;

/*
Why NavLink instead of Link?
NavLink lets us know which page is currently active.
*/