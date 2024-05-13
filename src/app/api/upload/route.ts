import prisma from "@/lib/prisma";
import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get("file") as unknown as File;
  const email: string = data.get("email") as string;

  if (!file) {
    return NextResponse.json({ upload: false });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ upload: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  console.log(buffer);

  const fileName = `${user.id}_${file.name}`;

  const path = join("/", "/uploads", `/${file.name}`);

  await writeFile(path, buffer, "utf-8", (err) => console.log(err));

  console.log(`Open ${path} to see the uploaded file`);

  await prisma.user.update({
    where: { email },
    data: { image: path },
  });

  return NextResponse.json({ upload: true });
}
