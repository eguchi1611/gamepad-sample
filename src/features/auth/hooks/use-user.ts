import { useContext } from "react";
import { authContext } from "../components/auth-provider";

export function useUser() {
  const user = useContext(authContext);
  const isLoading = user === "error";
  return {
    user: isLoading ? null : user,
    isLoading,
  };
}
