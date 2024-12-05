
import { AuthRegisterForm } from "@/features/auth/components";

export default async function RegisterPage({
  searchParams 
}: { searchParams: { callbackUrl: string } }
) {
  return (
    <AuthRegisterForm url={searchParams.callbackUrl} />
  );
}