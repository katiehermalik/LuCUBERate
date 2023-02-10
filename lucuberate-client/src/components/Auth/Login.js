import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../utils/api/user";
import AuthAPI from "../../utils/api/auth";
import { MailIcon, LockIcon } from "@primer/octicons-react";
import {
  UserContext,
  ThemeContext,
  GuideContext,
  CategoryListContext,
} from "../../context/ContextProvider";

const Login = ({ showLoginModal, setShowLoginModal, setShowSignUpModal }) => {
  const navigate = useNavigate();
  const { setTheme } = useContext(ThemeContext);
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setShowGuide } = useContext(GuideContext);
  const { setShowCategoryList } = useContext(CategoryListContext);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    userError: "",
    matchError: "",
  });

  let googleLoginUrl;
  if (process.env.NODE_ENV === "production") {
    googleLoginUrl = "https://lucuberate.com/api/v1/oauth/google";
  } else {
    googleLoginUrl = "http://localhost:4000/api/v1/oauth/google";
  }

  const closeModal = e => {
    e.stopPropagation();
    setUserInput({
      email: "",
      password: "",
      userError: "",
      matchError: "",
    });
    setShowLoginModal(false);
    e.target.name === "SignUp" && setShowSignUpModal(true);
  };

  const handleChange = e => {
    setUserInput(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    userInput.isLoggingIn = true;
    const data = await AuthAPI.login(userInput);
    if (data.userError) {
      setUserInput(prevState => ({
        ...prevState,
        userError: data.userError,
      }));
    } else if (data.matchError) {
      setUserInput(prevState => ({
        ...prevState,
        matchError: data.matchError,
      }));
      if (data.userError === undefined) {
        setUserInput(prevState => ({
          ...prevState,
          userError: "",
        }));
      }
    } else {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
        })
      );
      setCurrentUserInfo(data);
      setTheme(data.theme === "dark" ? "dark" : "light");
      setShowLoginModal(false);
      if (data.showGuideModal) {
        setShowGuide(true);
        setShowCategoryList(false);
        if (data.cubes.length !== 0) {
          navigate(`/dashboard/${data.categories[0].cubes[0]}`);
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/dashboard");
      }
    }
  };

  const fetchOAuthUser = async () => {
    const userInfo = await UserAPI.userData();
    const { userData: data } = userInfo;
    if (data._id) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
        })
      );
      setCurrentUserInfo(data);
      setTheme(data.theme === "dark" ? "dark" : "light");
      setShowLoginModal(false);
      if (data.showGuideModal) {
        setShowGuide(true);
        setShowCategoryList(false);
        if (data.cubes.length !== 0) {
          navigate(`/dashboard/${data.categories[0].cubes[0]}`);
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/dashboard");
      }
    }
  };

  const loginWithGoogle = async () => {
    function popupWindow(url, windowName, win, w, h) {
      const y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
      const x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
      return win.open(
        url,
        windowName,
        `width=${w}, height=${h}, top=${y}, left=${x}`
      );
    }
    const newWindow = popupWindow(
      googleLoginUrl,
      "Login with Google",
      window,
      500,
      600
    );
    if (newWindow) {
      const timer = setInterval(() => {
        if (newWindow.closed) {
          fetchOAuthUser();
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 500);
    }
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
  };

  return (
    <>
      {showLoginModal && (
        <div
          className="modal"
          id="modalLoginForm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Login</h4>
                <button
                  type="button"
                  onClick={closeModal}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="md-form">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="login-email">
                      <MailIcon size={16} className="label-icon" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="login-email"
                      className="form-control validate"
                      value={userInput.email}
                      onChange={handleChange}
                      required
                    />
                    {userInput.userError && (
                      <p style={errorStyle}>{userInput.userError}</p>
                    )}
                  </div>
                  <div className="md-form mb-4">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="login-pass">
                      <LockIcon size={16} className="label-icon" />
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="login-pass"
                      className="form-control validate"
                      value={userInput.password}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                    {userInput.matchError && (
                      <p style={errorStyle}>{userInput.matchError}</p>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <hr size="2" width="90%" />
                  <button type="submit" className="btn form-btn btn-secondary">
                    Login
                  </button>
                  <hr size="2" width="70%" />
                  <p>
                    Need an account?{" "}
                    <Link
                      to="/"
                      name="SignUp"
                      onClick={closeModal}
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#modalRegisterForm">
                      Sign Up Here
                    </Link>
                  </p>
                </div>
              </form>
              <button onClick={loginWithGoogle}>Google</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
