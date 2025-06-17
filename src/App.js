import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar, Navbar } from "./App/Components/index";
import {
  CreateCampaign,
  Home,
  CreatePosts,
  Profile,
  Connect,
} from "./App/Pages/index";
import { useAuthStore } from "./store/useAuthStore";
import GoogleRedirectHandler from "./services/googleHandler";
import OAuthSuccess from "./auth/authSuccess";

const App = () => {
  const { token } = useAuthStore();

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        {token && <Sidebar />}
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        {token && <Navbar />}

        <Routes>
          <Route
            path="/api/auth/googlelogin"
            element={<GoogleRedirectHandler />}
          />

          {/* <Route path="/oauth-success" element={<OAuthSuccess />} /> */}

          {!token && <Route path="/Connect" element={<Connect />} />}

          {token && (
            <>
              <Route path="/Home" element={<Home />} />

              <Route path="/createPosts/:edit" element={<CreatePosts />} />

              <Route path="/Profile" element={<Profile />} />

              <Route path="/create-campaign" element={<CreateCampaign />} />
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
