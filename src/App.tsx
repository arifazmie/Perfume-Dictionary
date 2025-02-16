import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import PerfumeDetail from "./components/perfume/PerfumeDetail";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import routes from "tempo-routes";
import { supabase } from "./lib/supabase";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/signin");
      } else if (event === "SIGNED_IN") {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/perfume/:id" element={<PerfumeDetail />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
