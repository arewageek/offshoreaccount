import ReturnToPrev from "@/components/ReturnToPrev";
import AccountSettings from "@/components/user/settings/admin/AccountSettings";
import PasswordResetForm from "@/components/user/settings/admin/PasswordReset";
import UploadImage from "@/components/user/settings/admin/UploadImage";
import UserCard from "@/components/user/settings/admin/UserCard";
import { getUserData } from "@/lib/actions/profileActions";

const UserAccountSettings = async (id: { params: { id: string } }) => {
  const user = await getUserData({ id: id.params.id });

  console.log({ user });

  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <div className="w-full mb-10 px-3">
        <ReturnToPrev />
      </div>
      <div className="w-full lg:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 grid gap-10">
          <UserCard
            firstName={user?.firstName as string}
            lastName={user?.lastName as string}
            image={user?.image as string}
            role={user?.role as string}
          />
          <PasswordResetForm
            email={user?.email as string}
            password={user?.password as string}
          />
        </div>

        <div className="w-full lg:w-1/2 grid gap-10">
          <AccountSettings
            firstName={user?.firstName as string}
            lastName={user?.lastName as string}
            phone={user?.phone as string}
            email={user?.email as string}
          />
          <UploadImage email={user?.email as string} />
        </div>
      </div>
    </main>
  );
};

export default UserAccountSettings;
