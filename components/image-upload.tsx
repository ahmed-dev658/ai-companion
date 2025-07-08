"use client";

import { useEffect, useState } from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  console.log("🚀 ~ disabled:", disabled);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-3 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          const info = result.info;

          if (typeof info === "object" && "secure_url" in info) {
            onChange(info.secure_url);
          }
        }}
        options={{ maxFiles: 1 }}
        // disabled={disabled}
        uploadPreset="bw8ckcwb"
      >
        <div
          className={cn(
            `p-4
        border-4
        border-dashed
        border-primary/10
        rounded-lg
        hover:opacity-75
        transition
        flex
        flex-col
        space-y-2
        items-center
        justify-center`,
            disabled ? "opacity-50 pointer-events-none" : ""
          )}
        >
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="Upload"
              src={value || "/file.svg"}
              className="rounded-lg object-cover cursor-pointer"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
