import { FC } from "react";
import "./Header.scss";
import { NavLink, useHistory } from "react-router-dom";
import { websiteName } from "../settings";

interface UserData {
  isLoggedIn: boolean;
}

interface NavData {
  access: "member" | "visitor";
  navLabel: string;
  navPath: string;
  onClick?: () => void;
}

const Header: FC<UserData> = ({ isLoggedIn }) => {
  const history = useHistory();

  const pageTitle: string = websiteName ? websiteName : "Portfolio as imagined";

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const headerNavLinks: NavData[] = [
    { access: "visitor", navLabel: "Portfolio", navPath: "/" },
    { access: "visitor", navLabel: "Message wall", navPath: "/messagewall" },
    { access: "visitor", navLabel: "Login", navPath: "/login" },
    { access: "visitor", navLabel: "Register", navPath: "/register" },
    { access: "member", navLabel: "Portfolio", navPath: "/" },
    { access: "member", navLabel: "Message wall", navPath: "/messagewall" },
    { access: "member", navLabel: "Settings", navPath: "/settings" },
    {
      access: "member",
      navLabel: "Logout",
      navPath: "/logout",
      onClick: logout,
    },
  ];

  let showMenu: NavData[] = headerNavLinks.filter(
    (x) =>
      (isLoggedIn && x.access === "member") ||
      (!isLoggedIn && x.access === "visitor")
  );

  return (
    <div className="header">
      <h1 className="header-title">
        <NavLink to="/">{pageTitle}</NavLink>
      </h1>
      <ul className="header-navigation">
        {showMenu.map((x, index) => (
          <li key={index} onClick={x.onClick}>
            <NavLink activeClassName="active" exact={true} to={x.navPath}>
              {x.navLabel}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
