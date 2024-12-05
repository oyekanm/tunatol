import { AuthLoginForm } from "@/features/auth/components";

export default async function LoginPage({
  searchParams 
}: { searchParams: { callbackUrl: string } }
) {
  return (
    <AuthLoginForm url={searchParams.callbackUrl} />
  );
}