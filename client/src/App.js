import { Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/noto-sans";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { HomePage } from "./components/HomePage";
import { NewNavBar } from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import ShuttleServiceProviderPage from "./components/shuttleServiceHome";
import Company from "./components/Company";
import theme from "./theme";

function App() {
  const storedToken = localStorage.getItem("token");
  const isLoggedIn = !!storedToken;
  // console.log(isLoggedIn);

  return (
    <ChakraProvider theme={theme}>
      <NewNavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/shuttleService"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" />
            ) : (
              <ShuttleServiceProviderPage />
            )
          }
        />
        <Route
          path="/company"
          element={!isLoggedIn ? <Navigate to="/login" /> : <Company />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
