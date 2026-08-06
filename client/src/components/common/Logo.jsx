import {Link} from "react-router-dom";

function Logo() {
  return(
    <Link to="/" className="text-3xl font-bold tracking-tight">
      <span className="text-pink-500">Fashion</span>
      <span className="text-black">Hub</span>
    </Link>
  )
}

export default Logo;