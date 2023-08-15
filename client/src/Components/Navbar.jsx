import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import logo from "../assets/logo.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const Navbar = () => {
    const [changeNav, setChangeNav] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    const changeNavColor = () => {
        if (window.scrollY <= 90) {
            setChangeNav(false);
        } else {
            setChangeNav(true);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", changeNavColor);
    }, [changeNavColor]);

    useEffect(() => {
        const getUserData = async () => {
            const res = await fetch(`${BACKEND_URL}/profile`, {
                credentials: "include",
            });

            const userData = await res.json();
            setUserInfo(userData);
            return;
        };

        getUserData();
    }, []);

    const logout = async () => {
        const res = await fetch(`${BACKEND_URL}/logout`, {
            method: "POST",
            credentials: "include",
        });
        console.log("logout");

        await res.json();
        setUserInfo("");
    };

    return (
        <nav
            className={`px-8 py-5 flex items-center justify-between fixed w-full ${
                changeNav && "shadow-xl py-4 backdrop-blur-sm"
            }`}
        >
            <Link to="/" className="font-bold text-3xl flex items-center gap-2">
                <img src={logo} alt="logo" width={60} />
                <h1 className="font-bold text-3xl">Xsphere</h1>
            </Link>

            <div className="flex items-center gap-4">
                <Link
                    to={userInfo ? "/post-create" : "/auth?mode=login"}
                    className="px-3 py-2 border-2 border-black font-medium hover:border-black/80 "
                >
                    {userInfo ? "Create New Post" : "Log In"}
                </Link>
                <Link
                    to={userInfo ? "/auth?mode=login" : "/auth?mode=register"}
                    onClick={logout}
                    className="px-3 py-2 border-2 border-black font-medium text-white bg-black hover:opacity-80"
                >
                    {userInfo ? "Log Out" : "Register"}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
