import AuthContainer from "@/components/auth/AuthContainer";
import SigninForm from "@/components/auth/SigninForm";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200 p-5">
      <AuthContainer
        title="Hello, Welcome back!"
        subnote="Let's sign you in"
        footerType="signin"
      >
        <SigninForm />
      </AuthContainer>
    </div>
  );
}
