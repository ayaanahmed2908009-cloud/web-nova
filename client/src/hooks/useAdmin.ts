import { useQuery } from "@tanstack/react-query";

interface AdminResponse {
  isAdmin: boolean;
}

export function useAdmin() {
  const { data, isLoading } = useQuery<AdminResponse>({
    queryKey: ["/api/auth/is-admin"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isAdmin: data?.isAdmin || false,
    isLoading,
  };
}