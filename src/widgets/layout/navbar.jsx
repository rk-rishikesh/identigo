import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  // const navList = (
  //   // <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
  //   //   {routes.map(({ name, path, icon, href, target }) => (
  //   //     <Typography
  //   //       key={name}
  //   //       as="li"
  //   //       variant="small"
  //   //       color="inherit"
  //   //       className="capitalize"
  //   //     >
  //   //       {href ? (
  //   //         <a
  //   //           href={href}
  //   //           target={target}
  //   //           className="flex items-center gap-1 p-1 font-normal"
  //   //         >
  //   //           {icon &&
  //   //             React.createElement(icon, {
  //   //               className: "w-[18px] h-[18px] opacity-75 mr-1",
  //   //             })}
  //   //           {name}
  //   //         </a>
  //   //       ) : (
  //   //         <Link
  //   //           to={path}
  //   //           target={target}
  //   //           className="flex items-center gap-1 p-1 font-normal"
  //   //         >
  //   //           {icon &&
  //   //             React.createElement(icon, {
  //   //               className: "w-[18px] h-[18px] opacity-75 mr-1",
  //   //             })}
  //   //           {name}
  //   //         </Link>
  //   //       )}
  //   //     </Typography>
  //   //   ))}
  //   // </ul>
  // );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            <img src="https://bafkreibsuo6xnlxtzrf7rcteae454opjuy5kgpmgypp2pcxh2odm7nxaba.ipfs.nftstorage.link/" style={{width:160}}/>
          </Typography>
        </Link>
        <div className="hidden gap-2 lg:flex">
          {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })}
        </div>
      </div>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "IdentiGo",
  action: (
    <a
      href="http://127.0.0.1:5173/home"
      target="_blank"
    >
    </a>
  ),
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
