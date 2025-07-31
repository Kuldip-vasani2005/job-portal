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
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
// import store from "../../redux/store";

const Login = () => {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    // formData.append("email", input.email);
    // formData.append("password", input.password);
    // formData.append("role", input.role);

    // if (input.file) {
    //   formData.append("file", input.file);
    // }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }

      console.log("Registration success:", res.data);
    } catch (error) {
      console.error("Registration error:", error);
      toast.success(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
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
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 cursor-pointer">
              Login
            </Button>
          )}

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
