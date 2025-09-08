import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar, Navbar } from "./app/Components/index";
import {
  AllPosts,
  Home,
  CreatePosts,
  Profile,
  Connect,
} from "./app/Pages/index";
import { useAuthStore } from "./store/useAuthStore";
import OAuthSuccess from "./auth/authSuccess";

const App = () => {
  const { token } = useAuthStore();

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden relative w-20">{token && <Sidebar />}</div>

      <div className="flex-1 max-sm:w-full sm:pr-5 ml-10">
        {token && <Navbar />}

        <Routes>
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {!token && <Route path="/Connect" element={<Connect />} />}

          {token && (
            <>
              <Route path="/Home" element={<Home />} />
              <Route path="/createPosts/:edit" element={<CreatePosts />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/UserPosts" element={<AllPosts />} />
            </>
          )}

          <Route
            path="/"
            element={<Navigate to={token ? "/Home" : "/Connect"} replace />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/Home" : "/Connect"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
