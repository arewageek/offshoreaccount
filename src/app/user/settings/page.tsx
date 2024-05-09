import ContactForm from "@/components/forms/contactForm";
import PasswordResetForm from "@/components/user/settings/PasswordResetForm";

const Settings = () => {
  return (
    <main className="w-full bg-green-100 lg:px-10 p-2 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full md:w-full lg:w-3/5 px-3">
        <div className="w-full h-fit flex flex-wrap flex-col md:flex-row">
          <div className="w-full lg:w-2/4 h-fit px-2 lg:px-8 py-3">
            <h3 className="font-bold text-lg">Reset Password</h3>
            <div className="my-4 lg:w-[80%]">
              <PasswordResetForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
