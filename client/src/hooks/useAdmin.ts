import { useQuery } from "@tanstack/react-query";

export function useAdmin() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/auth/is-admin"],
    retry: false,
  });

  return {
    isAdmin: data?.isAdmin || false,
    isLoading,
  };
}