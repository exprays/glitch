"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

export const ImageInput = () => {
  const [banner, setBanner] = useState<File | null>(null);

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBanner(file);
  };

  return (
    <div className="col-span-full">
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="col-span-2">
            <label htmlFor="banner" className="text-gray-700 font-semibold">
              Banner of Event:
            </label>
            <Input
              id="banner"
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              pattern="/(\.jpg|\.jpeg|\.png|\.gif)$/i"
              className="border-2 rounded-md w-full px-3 py-2 mt-1 cursor-pointer"
            />
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};
