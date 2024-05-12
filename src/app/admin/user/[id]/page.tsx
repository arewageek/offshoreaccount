import ContactForm from "@/components/forms/contactForm";
import { AvailableCards } from "@/components/user/AvailableCards";
import AccountSettings from "@/components/user/settings/admin/AccountSettings";
import PasswordResetForm from "@/components/user/settings/admin/PasswordReset";
import UploadImage from "@/components/user/settings/admin/UploadImage";
import UserCard from "@/components/user/settings/UserCard";
import { getUserData } from "@/lib/actions/profileActions";
import Image from "next/image";
import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

const UserProfile = async (id: { params: { id: string } }) => {
  const user = await getUserData({ id: id.params.id });

  console.log({ user });

  const { firstName, lastName, email, phone, image, role, password } = user;

  return (
    <main className="w-full lg:px-10 lg:py-20 py-10 rounded-3xl flex flex-wrap  bg-green-200">
      <div className="w-full lg:w-full px-3 flex flex-col lg:flex-row gap-10">
        <div className="py-6 lg:py-10 px-10">
          <div className="flex gap-3">
            <div>
              <Image
                src={user.image as string}
                height={60}
                width={60}
                alt={firstName as string}
                className="rounded-full"
              />
            </div>
            <div>
              <span className="font-bold text-sm">Name</span>
              <h2 className="font-bold text-2xl">
                {firstName} {lastName}
              </h2>
            </div>
            <Link href={`/admin/user/${id.params.id}/edit`}>
              <div className="rounded-full p-3 text-black bg-green-400">
                <FaFileAlt />
              </div>
            </Link>
          </div>

          <div className="flex gap-3 lg:flex-row flex-col mt-10">
            <div>
              <AvailableCards />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
