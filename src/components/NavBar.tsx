import './navBar.less';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const getStyle = (isActive: boolean) =>
        isActive ? 'navLinkActive' : 'navLink';
    return (
        <div className="navBar">
            <div className="navBarContainer">
                <br />
                <NavLink
                    className={({ isActive }) => getStyle(isActive)}
                    to="/"
                >
                    The Map
                </NavLink>{' '}
                {' | '}
                <NavLink
                    to="/about"
                    className={({ isActive }) => getStyle(isActive)}
                >
                    About
                </NavLink>{' '}
                {' | '}
                <NavLink
                    to="/login"
                    className={({ isActive }) => getStyle(isActive)}
                >
                    Login
                </NavLink>
                <br />
            </div>
        </div>
    );
};

export default NavBar;
