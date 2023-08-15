import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar />
            <section className="px-10 py-[100px]">
                <Outlet />
            </section>
        </div>
    );
};

export default Main;
