"use client";
import { getUsers } from "@/client/users";
import { createUser } from "@/server/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const query = useQuery({ queryKey: ["todos"], queryFn: getUsers });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (query.isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={() => mutation.mutate({ id: 1, name: "John Doe" })}>
        Create User
      </button>
      {query.data?.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
