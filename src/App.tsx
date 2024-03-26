import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home page/HomePage";
import MoviePage from "./pages/movie page/MoviePage";
import EndScript from "./components/end script/EndScript";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import ErrorPage from "./pages/error page/ErrorPage";

function App() {
  // path ของหน้าต่างๆ
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          children: [{ path: "/", element: <EndScript /> }],
        },

        {
          path: "/movie",
          element: <MoviePage />,
          children: [{ path: "/movie", element: <EndScript /> }],
        },
      ],
      // หน้า Errer
      errorElement: <ErrorPage />,
    },
  ]);

  // สร้าง theme ของ web
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="container">
            <RouterProvider router={routers} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
