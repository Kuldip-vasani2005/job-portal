import { React, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  // For regular input fields
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //for Submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
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
          <h1 className="text-center font-bold text-xl mb-5 ">Login</h1>

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
          </div>
          <Button type="submit" className="w-full my-4 cursor-pointer">
            Login
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline ">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
