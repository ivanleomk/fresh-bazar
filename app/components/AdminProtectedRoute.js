import { useRouter } from "next/router";
import { useUserContext } from "../context/UserContext";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserContext();

  const router = useRouter();

  //We protect Admin Routes
  //Case 1 : User is not logged in and tries to access a role
  if (!isAuthenticated && router.pathname.includes("/admin")) {
    router.push("/");
  }
  //Case 2 : User is logged in but is not an access
  else if (
    isAuthenticated &&
    router.pathname.includes("/admin") &&
    user.userPermissions != "admin"
  ) {
    router.push("/");
  }
  return children;
};

export default AdminProtectedRoute;
