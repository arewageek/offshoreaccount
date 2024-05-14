import ContactForm from "@/components/forms/contactForm";
import AccountSettings from "@/components/user/settings/AccountSettings";
import PasswordResetForm from "@/components/user/settings/PasswordResetForm";
import UploadImage from "@/components/user/settings/UploadImage";
import UserCard from "@/components/user/settings/UserCard";

const Settings = async () => {
  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full md:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 grid gap-10">
          <UserCard />
          <PasswordResetForm />
        </div>

        <div className="w-full lg:w-1/2 grid gap-10">
          <AccountSettings />
          <UploadImage />
        </div>

        {/* <div className="w-full h-fit flex flex-wrap flex-col md:flex-row">
          <div className="w-full lg:w-2/4 h-fit px-2 lg:px-8 py-3">
            <h3 className="font-bold text-lg">Reset Password</h3>
            <div className="my-4 lg:w-[80%]">
              <PasswordResetForm />
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default Settings;
