import { Avatar, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import AllRecipes from "./all-recipes";
import EditIcon from "@mui/icons-material/Edit";

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const initialUserData: UserData = {
    firstName: "First",
    lastName: "Second",
    username: "UserName",
    email: "email@email.com"
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [edit, setEdit] = useState(false);
  const [tempUserData, setTempUserData] = useState<UserData>(initialUserData); // To store temporary changes during editing

  const handleUpdateProfile = () => {
    setEdit(false); 
  };

  const handleCancelEdit = () => {

    setUserData(tempUserData); 
    setEdit(false); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTempUserData({ ...tempUserData, [id]: value }); 
  };

  return (
    <>
      <div className="w-full min-h-screen bg-backgroundLight flex phone:flex-col">
        <div className="p-20 tablet:p-5 w-1/3 phone:w-full bg-backgroundLight flex justify-center">
          <div className="flex flex-col items-center w-full rounded-xl">
            <div className="flex w-full my-10 rounded-xl">
              <img
                src="https://placehold.co/600x400/png"
                className="w-full h-full rounded-xl"
                alt="Profile Picture"
              />
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
                <h1 className="text-3xl text-textLight">{userData.firstName} {userData.lastName}</h1>
              )}
              {edit ? (
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  className="rounded-lg w-full m-1 shadow-md bg-backgroundLight"
                  value={tempUserData.username}
                  onChange={handleChange}
                />
              ) : (
                <h1 className="text-3xl text-textLight">{userData.username}</h1>
              )}
              {edit ? (
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  className="rounded-lg w-full m-1 shadow-md bg-backgroundLight"
                  value={tempUserData.email}
                  onChange={handleChange}
                />
              ) : (
                <h1 className="text-base text-textLight">{userData.email}</h1>
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
