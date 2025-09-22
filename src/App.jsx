import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import Login from "./pages/auth/Login";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route element={<MainLayout />}>
        {routes.map((item, index) => {
          return (
            <Route
              key={index}
              index={item?.index ? true : false}
              path={item.path}
              element={item.element}
            />
          );
        })}
      </Route>

      <Route
        path="/*"
        element={
          <h1 className="text-[red] text-3xl text-center">Page not found!</h1>
        }
      ></Route>
    </Routes>
  );
}

export default App;
