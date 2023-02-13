import './navBar.less';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navBar">
            <br />
            <NavLink to="/">The Map</NavLink> {' | '}
            <NavLink to="/about">About</NavLink> {' | '}
            <NavLink to="/login">Login</NavLink>
            <br />
        </div>
    );
};

export default NavBar;
