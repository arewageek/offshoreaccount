"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { demoUsers } from "@/lib/actions/data";
import { useEffect, useState } from "react";

import React from "react";
import { allUsers } from "@/lib/actions/profileActions";
import Image from "next/image";
import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState<any[]>([]); // Initialize as empty array

  const rowsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const data = await allUsers(); // Await the result
      setUsers(data);

      console.log({ data });

      setPages(Math.ceil(data.length / rowsPerPage)); // Calculate pages after setting users
    } catch (err) {
      console.log({ err });
    }
  };

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [page, users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px] bg-transparent",
        tr: "bg-transparent",
      }}
    >
      <TableHeader>
        <TableColumn key="image"> </TableColumn>
        <TableColumn key="firstName">NAME</TableColumn>
        <TableColumn key="email">EMAIL</TableColumn>
        <TableColumn key="phone">PHONE NUMBER</TableColumn>
        <TableColumn key="url"> </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow
            key={item.email}
            className="py-2 border-b-1 border-b-green-500"
          >
            <TableCell>
              <Image
                src={item.image ? item.image : "/default.jpg"}
                width={140}
                height={140}
                alt={item.firstName}
                className="h-[50pt] min-w-[50pt] lg:w-[50pt] rounded-full"
              />
            </TableCell>
            <TableCell className="py-4 lg:py-8">
              <div>Name</div>
              <div className="text-xl font-bold">
                {item.firstName} {item.lastName}
              </div>
            </TableCell>
            <TableCell className="py-4 lg:py-8">
              <div>Email</div>
              <div className="text-xl font-bold">{item.email}</div>
            </TableCell>
            <TableCell className="py-4 lg:py-8">
              <div>Phone</div>
              <div className="text-xl font-bold">{item.phone}</div>
            </TableCell>
            <TableCell className="py-4 lg:py-8">
              <div className="w-[50pt] flex items-center justify-center">
                <Link
                  href={`/admin/user/${item.id}`}
                  className="bg-green-300 text-black p-3 rounded-full"
                >
                  <FaFileAlt />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
