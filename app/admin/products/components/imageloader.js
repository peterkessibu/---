import React from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import Button from "./button";

export default function ProductImageUploader({
  imageUrl,
  setImageUrl,
  setImageFile,
  errorMessage,
  setErrorMessage,
}) {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Please upload a valid image (JPEG, PNG, JPG).");
        return;
      }
      setErrorMessage("");
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full">
        <div
          className="relative w-full h-48 sm:w-48 sm:h-48 mx-auto border border-dashed border-gray-400 flex justify-center items-center cursor-pointer"
          onClick={() => document.getElementById("imageUpload").click()}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Product Image"
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          ) : (
            <ImageIcon className="text-gray-400 w-12 h-12" />
          )}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mt-2">{errorMessage}</p>
        )}
      </div>
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif"
        id="imageUpload"
        className="hidden"
        onChange={handleImageUpload}
      />
      <Button
        type="button"
        onClick={() => document.getElementById("imageUpload").click()}
      >
        Upload Image
      </Button>
    </div>
  );
}
