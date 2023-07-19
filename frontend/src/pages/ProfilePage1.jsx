import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../redux/slices/usersApiSlice";
import PrivateRoute from "../components/PrivateRoute";

function ProfilePage() {
  const [updated, setUpdated] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  useEffect(() => {
    //const userInfo = localStorage.getItem("userInfo");
    //setUser(JSON.parse(userInfo));
    //console.log(userInfo.name);
    async function getProfileData() {
      //console.log("inside async and user info: " + user);
      //const data = await getProfile();
      //setUser(data);
      //console.log(user);
    }

    getProfileData();
  }, []);

  return (
    <div>
      {userInfo ? (
        <>
          <div>Name: {userInfo?.name}</div>
          <div>Email: {userInfo?.email}</div>
        </>
      ) : (
        <>You are not authorized to view this profile</>
      )}
    </div>
  );
}

export default ProfilePage;
