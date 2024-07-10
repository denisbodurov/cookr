import { Avatar, Button } from "@mui/material";
import React from "react";
import AllRecipes from "./all-recipes";
import SettingsIcon from '@mui/icons-material/Settings';
const ProfilePage: React.FC = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-backgroundLight flex phone:flex-col">
        <div className="p-20 tablet:p-5 w-1/3 phone:w-full bg-backgroundLight flex justify-center">
          <div className="flex flex-col items-center w-full rounded-xl">
            <div className="flex w-full my-10 rounded-xl">
              <img
                src="https://placehold.co/600x400/png"
                className="w-full h-full rounded-xl"
                alt="asdsad"
              />
            </div>
            <div className="flex flex-col items-center gap-5 w-full">
              <h1 className="text-3xl text-textLight">First Second</h1>
              <h1 className="text-3xl text-textLight">UserName</h1>
              <h1 className="text-base text-textLight">email@email.com</h1>
            </div>
            <Button
              variant="contained"
              
              endIcon={<SettingsIcon />}
              className="mb-5 w-48 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base"
            >
              LOGIN NOW
            </Button>
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
