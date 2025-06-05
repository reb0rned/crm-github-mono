import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <main className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Welcome to profile!</h2>
      <p className="text-gray-300">here is your email:</p>
      {user?.email}
    </main>
  );
}
