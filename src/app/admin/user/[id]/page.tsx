import ContactForm from "@/components/forms/contactForm";
import AccountSettings from "@/components/user/settings/AccountSettings";
import PasswordResetForm from "@/components/user/settings/PasswordResetForm";
import UploadImage from "@/components/user/settings/UploadImage";
import UserCard from "@/components/user/settings/UserCard";
import { getUserData } from "@/lib/actions/profileActions";

const UserAccountSettings = async (id: { params: { id: string } }) => {
  const user = await getUserData({ id: id.params.id });

  console.log({ user });

  const { firstName, lastName, email, phone, image, role, password } = user;

  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full md:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 grid gap-10">
          <UserCard
            firstName={firstName}
            lastName={lastName}
            image={image}
            role={role}
          />
          <PasswordResetForm isAdmin={true} password={password} />
        </div>

        <div className="w-full lg:w-1/2 grid gap-10">
          <AccountSettings
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
          />
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

export default UserAccountSettings;
