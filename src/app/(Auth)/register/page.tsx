
import { Toast } from "@/components/reusable";
import { AuthRegisterForm } from "@/features/auth/components";

export default async function RegisterPage() {
  return (
    <section >
      <div className="w-full mx-auto bg-white max-w-[50rem] shadow-[0_0_15px_5px_rgba(0,0,0,.8)] p-4 px-8 rounded-[10px]">
        <AuthRegisterForm />
        
      </div>
    </section>
  );
}