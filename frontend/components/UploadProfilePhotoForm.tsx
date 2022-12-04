import Button from "./Button";
import { UserIcon, PencilIcon } from '@heroicons/react/24/solid';
import React, { useState } from "react";
import { uploadFile } from "../api";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PHOTO_QUERY } from "../graphql/queries/profile";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface IUploadProfilePhotoVariables {
  url: string
}

function UploadProfilePhotoForm() {
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadPhotoUrl] = useMutation<{ uploadProfilePhoto: string }, IUploadProfilePhotoVariables>(UPLOAD_PROFILE_PHOTO_QUERY)
  const router = useRouter();
  const session = useSession();

  console.log(session);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setPhoto(reader.result);
        setPhotoFile(file);
      }
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (photoFile) {
      const response = await uploadFile(photoFile, photoFile?.name);
      console.log(response);
      if (response) {
        await uploadPhotoUrl({
          variables: {
            url: response?.location
          }
        });
        router.push("/");
      }
    }
  }

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      {photo ?
        <span className="w-32 h-32 inline-block group relative transition cursor-pointer">
          <img src={photo as string} className="rounded-full object-cover w-32 h-32" />
          <span className="absolute bg-black w-full h-full top-0 bottom-0 left-0 right-0 rounded-full group-hover:opacity-70 group-hover:block opacity-0 transition duration-300" />
          <label htmlFor="photo-input">
            <PencilIcon className="opacity-0 group-hover:opacity-100 transition duration-300 w-5 h-5 absolute top-[45%] left-[45%]" />
          </label>
        </span> :
        <span className="w-32 h-32 inline-block rounded-full p-3 cursor-pointer relative">
          <label htmlFor="photo-input">
            <UserIcon />
          </label>
          <span className="text-gray-400">Click here to select</span>
        </span>}

      <input type="file" id="photo-input" className="hidden" onChange={handlePhotoChange} />
      <div>
        {photo && <Button className="mt-10 w-60">
          Upload Profile Photo
        </Button>}
      </div>
    </form>
  )
}

export default UploadProfilePhotoForm;