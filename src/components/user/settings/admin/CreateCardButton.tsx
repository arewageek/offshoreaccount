"use client";
import { generateCard } from "@/lib/actions/profileActions";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CreateCardButton({ id }: { id: string }) {
  const router = useRouter();

  const createCard = async () => {
    const created = await generateCard({ id: id, amount });

    if (created === "success") {
      toast.success("New card has been generated");
      router.refresh();

      return;
    }

    toast.error("toast");
    return;
  };

  const [amount, setAmount] = useState<number>(0);

  return (
    <form>
      <Input
        className="px-0 font-bold"
        type="number"
        color="success"
        variant="underlined"
        label="Funding Amount"
        onChange={(e) => setAmount(Number(e.target.value))}
        endContent={
          <Button
            onClick={createCard}
            className="rounded-full bg-green-300 text-black"
          >
            <FaPlus />
          </Button>
        }
      />
    </form>
  );
}
