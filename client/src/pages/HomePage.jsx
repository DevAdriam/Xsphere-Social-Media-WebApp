import { useContext } from "react";
import PostItem from "../Components/PostItem";
import fakePosts from "../utils/fakepost";
import { UserContext } from "../Context/UserContext";

import AuthForm from "../Components/AuthForm";

const HomePage = () => {
    const { userInfo } = useContext(UserContext);

    // ** if is not login go to login page , or if already logged in go to home page
    return userInfo ? (
        <div className="w-full h-full flex items-center justify-start flex-wrap gap-5 bg-white/90">
            {fakePosts.map((post) => {
                return <PostItem key={post.id} post={post} />;
            })}
        </div>
    ) : (
        <AuthForm />
    );
};

export default HomePage;
