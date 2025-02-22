import { useAuth } from "@/auth/auth.state";

export const CurrentUserInfo = () => {
  const profile = useAuth((state) => state.profile);

  if (!profile) {
    return null;
  }

  return (
    <div>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
};
