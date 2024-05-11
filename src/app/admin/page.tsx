import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { allUsers } from "@/lib/actions/adminActions";
import UsersTable from "@/components/admin/UsersTable";

const AdminDashboard = async () => {
  return (
    <main className="w-full bg-green-100 lg:px-10 p-2 lg:py-20 py-10 rounded-3xl flex flex-wrap">
      <UsersTable />
    </main>
  );
};

export default AdminDashboard;
