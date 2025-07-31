import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/contants";


const Signup = () => {
     const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  // For regular input fields
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // For file input
  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  //for Submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }
 

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }

      console.log("Registration success:", res.data);
    } catch (error) {
      console.error("Registration error:", error);
      toast.success(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-6xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-3"
          onSubmit={submitHandler}
        >
          <h1 className="text-center font-bold text-xl mb-5 ">Sign Up</h1>

          <div className="my-2">
            <Label className="block font-medium mb-1">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="border p-2 mr-2 w-full rounded"
            />
          </div>

          <div className="my-2 ">
            <Label className="block font-medium mb-1">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="border p-2 mr-2 w-full rounded"
            />
          </div>

          <div className="my-2">
            <Label className="block font-medium mb-1">Phone Number</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="border p-2 mr-2 w-full rounded"
            />
          </div>

          <div className="my-2">
            <Label className="block font-medium mb-1">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="border p-2 mr-2 w-full rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r1"
                  name="role"
                  checked={input.role === "jobseeker"}
                  onChange={changeEventHandler}
                  value="jobseeker"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">JobSeeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r2"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label htmlFor="profile-upload">Profile</Label>
              <Input
                id="profile-upload"
                accept="image/*"
                type="file"
                // value={input.file}
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          <Button type="submit" className="w-full my-4  cursor-pointer">
            Sign Up
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
