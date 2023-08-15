import { useContext, useState } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL);
const AuthForm = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const isLoginMode = searchParams.get("mode") === "login";

    const { userInfo, setUserInfo } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        const res = await fetch(`${BACKEND_URL}/register`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            console.log("success");
            setSearchParams("mode=login");
        } else {
            console.log(res.status);
            alert("Registration failed!");
            return;
        }
    };

    const login = async () => {
        const res = await fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            setUserInfo(data);
            alert("login successful~");
            navigate("/");
        } else {
            alert("Login failed");
            return;
        }
    };

    const formActionHandler = (e) => {
        e.preventDefault();

        if (isLoginMode) {
            login();
        } else {
            register();
        }

        setUsername("");
        setPassword("");
    };

    return (
        <div className="w-full h-full mt-10">
            <form
                // method="post"
                onSubmit={formActionHandler}
                className="w-[300px] md:w-[400px] mx-auto px-5 flex items-center flex-col gap-5"
            >
                <h1 className="font-bold text-2xl md:text-3xl mb-10">
                    {isLoginMode ? "Login Form" : "Register Form"}
                </h1>

                <div className="flex flex-col gap-2 flex-start w-full">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border-2 border-black px-5 py-2 "
                        placeholder="Enter your username"
                    />
                </div>

                <div className="flex flex-col gap-2 flex-start w-full">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-2 border-black px-5 py-2 "
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="border-none mt-8 bg-black hover:bg-black/90 text-white w-full py-3 text-center"
                >
                    {isLoginMode ? "login" : "Register"}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
