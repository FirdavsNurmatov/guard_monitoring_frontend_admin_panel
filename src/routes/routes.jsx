import RoleChecker from "../components/RoleChecker";
import Objects from "../pages/objects/Objects";
import User from "../pages/users/Users";

export const routes = [
  {
    path: "object",
    element: (
      <RoleChecker>
        <Objects />
      </RoleChecker>
    ),
  },
  {
    path: "users",
    element: (
      <RoleChecker>
        <User />
      </RoleChecker>
    ),
  },
  {
    path: "",
    element: <RoleChecker>{/* <EditListening /> */}</RoleChecker>,
  },
];
