import AuthContainer from "@/components/auth/AuthContainer";
import SigninForm from "@/components/auth/SigninForm";

export default function Home() {
  return (
    <AuthContainer
      title="Hello, Welcome back!"
      subnote="Let's sign you in"
      footerType="signin"
    >
      <SigninForm />
    </AuthContainer>
  );
}
