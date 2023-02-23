import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";
import { Login } from "../store/actions/userActions";

function Auth() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { IsLoggedIn, message, error, loading } = useSelector(
    (state: any) => state?.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginSuccess = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (IsLoggedIn) {
      navigate("/dashboard");
    }
  }, [IsLoggedIn]);

  const login = () => {
    // dispatch(Login(email, password, LoginSuccess));
    dispatch(Login("lachake@gmail.com", "12345678", LoginSuccess));
  };
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="w-80 border-2 rounded-md min-h-[450px] flex justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <form className="flex flex-col space-y-10 items-start p-4 justify-evenly">
            <div className="flex flex-col w-full space-y-4">
              <label>Email</label>
              <input
                className="input-main"
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className=" flex flex-col w-full space-y-4">
              <label>Password</label>
              <input
                className="input-main"
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onClick={login}
              className="btn btn-primary w-full my-4"
            >
              Login
            </button>
            <span className="text-error">{error && message}</span>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
