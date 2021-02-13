import { Skeleton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Home from "../../pages";
import { useUserContext } from "../context/UserContext";
import RedirectLink from "./RedirectLink";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserContext();
  const router = useRouter();
  console.log(
    `isAuthenticated is currently ${isAuthenticated} and user is ${user}`
  );
  //We protect Admin Routes
  //Case 1 : User is not logged in and tries to access a role
  if (!isAuthenticated && router.pathname.includes("/admin")) {
    return (
      <p>
        Unauthorized Entry. Go <RedirectLink text="Home" pathname="/" />
      </p>
    );
  }
  //Case 2 : User is logged in but is not an access
  else if (
    isAuthenticated &&
    router.pathname.includes("/admin") &&
    user.userPermissions != "admin"
  ) {
    return (
      <p>
        Unauthorized Entry. Go <RedirectLink text="Home" pathname="/" />
      </p>
    );
  }
  return children;
};

export default AdminProtectedRoute;
