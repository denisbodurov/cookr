import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import AllRecipes from "./all-recipes";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../provider/AuthProvider";
import { UpdateUser } from "../types/state/User";
import ImageUploader from "../components/imageUploader";

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const initialUserData: UpdateUser = {
    firstName: user!.firstName,
    lastName: user!.lastName,
    image: user!.image,
  };

  const [userData, setUserData] = useState<UpdateUser>(initialUserData);
  const [edit, setEdit] = useState(false);
  const [tempUserData, setTempUserData] = useState<UpdateUser>(initialUserData);

  const handleUpdateProfile = () => {
    setEdit(false);
    updateProfile(tempUserData);
    setUserData(tempUserData);
  };

  const handleCancelEdit = () => {
    setTempUserData(userData);
    setEdit(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTempUserData({ ...tempUserData, [id]: value });
  };

  const handleImageUpload = (image: string) => {
    setTempUserData({ ...tempUserData, image: image });
  }

  return (
    <>
      <div className="w-full min-h-screen bg-backgroundLight flex phone:flex-col">
        <div className="p-20 tablet:p-5 w-1/3 phone:w-full bg-backgroundLight flex justify-center">
          <div className="flex flex-col items-center w-full rounded-xl">
            <div className="flex w-full my-10 rounded-xl">
              {edit ? (
                <ImageUploader onImageUpload={handleImageUpload}/>
              ) : (
                <img
                  src="https://placehold.co/600x400/png"
                  className="w-full h-full rounded-xl"
                  alt="Profile Picture"
                />
              )}
            </div>
            <div className="flex flex-col items-center gap-5 w-full">
              {edit ? (
                <div className="flex flex-row w-full">
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    className="rounded-lg w-full m-1 shadow-md bg-backgroundLight"
                    value={tempUserData.firstName}
                    onChange={handleChange}
                  />
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    className="rounded-lg w-full m-1 shadow-md bg-backgroundLight"
                    value={tempUserData.lastName}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <h1 className="text-3xl text-textLight">
                  {userData.firstName} {userData.lastName}
                </h1>
              )}

              {!edit && (
                <>
                  <h1 className="text-3xl text-textLight">{user!.username}</h1>
                  <h1 className="text-base text-textLight">{user!.email}</h1>
                </>
              )}
            </div>
            {edit ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleCancelEdit}
                  className="my-2 w-48 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base"
                >
                  CANCEL
                </Button>
                <Button
                  variant="contained"
                  onClick={handleUpdateProfile}
                  className="my-2 w-48 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base"
                >
                  SAVE CHANGES
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  setTempUserData(userData); // Reset temporary data to current user data
                  setEdit(true); // Switch to edit mode
                }}
                endIcon={<EditIcon />}
                className="my-10 w-48 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base"
              >
                EDIT PROFILE
              </Button>
            )}
          </div>
        </div>

        <div className="w-2/3 phone:w-full bg-backgroundLight flex justify-center ">
          <AllRecipes />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
