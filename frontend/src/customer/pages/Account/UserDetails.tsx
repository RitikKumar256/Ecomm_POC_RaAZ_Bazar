import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { updateUserProfile } from "../../../Redux Toolkit/Customer/UserSlice";
import EditIcon from "@mui/icons-material/Edit";
import ProfileFildCard from "../../../seller/pages/Account/ProfileFildCard";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import { style } from "../../../seller/pages/Account/Profile";

const UserDetails = () => {
    const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store);
const [open, setOpen] = useState(false);

const [fullName, setFullName] = useState(
  user.user?.fullName || ""
);

const [mobile, setMobile] = useState(
  user.user?.mobile || ""
);

const handleClose = () => setOpen(false);



const handleOpen = () => {
  setOpen(true);
};

const handleUpdateProfile = () => {
  if (mobile.length !== 10) {
    alert("Mobile number must be 10 digits");
    return;}
  const jwt =
    localStorage.getItem("customer_jwt") || "";

  dispatch<any>(
    updateUserProfile({
      jwt,
      userData: {
        fullName,
        mobile,
      },
    })
  );

  setOpen(false);
};
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Persional Details
          </h1>
           <div>
            <Button
              onClick={handleOpen}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          {/* <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          /> */}
          <div>
            <ProfileFildCard keys={"Name"} value={user.user?.fullName} />
            <Divider />
            <ProfileFildCard keys={"Email"} value={user.user?.email} />
            <Divider />
            <ProfileFildCard keys={"Mobile"} value={user.user?.mobile} />
          </div>
        </div>
      </div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="space-y-5">

            <h1 className="text-xl font-bold">
              Update Profile
            </h1>

            <TextField
              fullWidth
              label="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

          <TextField
            fullWidth
            label="Mobile Number"
            value={mobile}
            onChange={(e) => {

              const value = e.target.value;


              if (/^\d{0,10}$/.test(value)) {
                setMobile(value);
              }

            }}
          />

            <Button
              fullWidth
              variant="contained"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </Button>

          </div>
        </Box>
      </Modal>
    
    </div>
  );
};

export default UserDetails;
