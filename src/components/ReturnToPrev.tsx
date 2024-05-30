"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const ReturnToPrev = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const goBack = () => {
    setLoading(true);
    router.back();
  };

  return (
    <div className="w-fit">
      <Button
        onClick={goBack}
        className="bg-transparent border-1 shadow-sm hover:shadow-md transition"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin border-2 border-t-transparent border-green-500 rounded-full"></div>
        ) : (
          <FaArrowLeft />
        )}
      </Button>
    </div>
  );
};

export default ReturnToPrev;
