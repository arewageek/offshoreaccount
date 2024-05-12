import ContactForm from "@/components/forms/contactForm";
import AccountSettings from "@/components/user/settings/admin/AccountSettings";
import PasswordResetForm from "@/components/user/settings/admin/PasswordReset";
import UploadImage from "@/components/user/settings/admin/UploadImage";
import UserCard from "@/components/user/settings/UserCard";
import { getUserData } from "@/lib/actions/profileActions";

const UserAccountSettings = async (id: { params: { id: string } }) => {
  const user = await getUserData({ id: id.params.id });

  console.log({ user });

  const { firstName, lastName, email, phone, image, role, password } = user;

  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full lg:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 grid gap-10">
          <UserCard
            firstName={firstName}
            lastName={lastName}
            image={image}
            role={role}
          />
          <PasswordResetForm email={email} password={password} />
        </div>

        <div className="w-full lg:w-1/2 grid gap-10">
          <AccountSettings
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
          />
          <UploadImage email={email} />
        </div>
      </div>
    </main>
  );
};

export default UserAccountSettings;
