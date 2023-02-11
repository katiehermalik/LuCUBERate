import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../utils/api/user";
import AuthAPI from "../../utils/api/auth";
import {
  PersonIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeClosedIcon,
} from "@primer/octicons-react";
import {
  UserContext,
  CubeContext,
  GuideContext,
  CategoryListContext,
} from "../../context/ContextProvider";

const SignUp = ({ showSignUpModal, setShowSignUpModal, setShowLoginModal }) => {
  const navigate = useNavigate();
  const form = useRef(null);
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setCurrentCubeId } = useContext(CubeContext);
  const { setShowGuide } = useContext(GuideContext);
  const { setShowCategoryList } = useContext(CategoryListContext);
  const [showPassword, setShowPassword] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    emailError: "",
    usernameError: "",
  });

  let googleLoginUrl;
  if (process.env.NODE_ENV === "production") {
    googleLoginUrl = "https://lucuberate.com/api/v1/oauth/google";
  } else {
    googleLoginUrl = "http://localhost:4000/api/v1/oauth/google";
  }

  const validateUsername = () => {
    if (newUserInfo.username?.length < 3) {
      setNewUserInfo(prevState => ({
        ...prevState,
        usernameError: "Username must be 3 or more characters long",
      }));
    }
  };

  const closeModal = e => {
    e.stopPropagation();
    setNewUserInfo({
      username: "",
      email: "",
      password: "",
      emailError: "",
      usernameError: "",
    });
    setShowSignUpModal(false);
    e.target.name === "Login" && setShowLoginModal(true);
  };

  const handleChange = e => {
    setNewUserInfo(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    newUserInfo.isRegistering = true;
    const data = await AuthAPI.signup(newUserInfo);
    if (data.emailError) {
      setNewUserInfo(prevState => ({
        ...prevState,
        emailError: data.emailError,
      }));
      validateUsername();
    } else {
      if (newUserInfo.username?.length < 3) {
        validateUsername();
      } else {
        if (data._id) {
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              isLoggedIn: true,
            })
          );
          setCurrentUserInfo(data);
          setCurrentCubeId(data.categories[2].cubes[0]);
          setShowSignUpModal(false);
          setShowGuide(true);
          setShowCategoryList(false);
          setNewUserInfo({
            username: "",
            email: "",
            password: "",
            emailError: "",
            usernameError: "",
          });
          navigate(`/dashboard/${data.categories[2].cubes[0]}`);
        }
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
      setCurrentCubeId(data.categories[2].cubes[0]);
      setShowSignUpModal(false);
      setShowGuide(true);
      setShowCategoryList(false);
      navigate(`/dashboard/${data.categories[2].cubes[0]}`);
    }
  };

  const signUpWithGoogle = async () => {
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
      {showSignUpModal && (
        <div
          className="modal"
          id="modalRegisterForm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Sign up</h4>
                <button
                  type="button"
                  onClick={closeModal}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="oauth-container">
                <button
                  className="oauth-btn google-btn"
                  onClick={signUpWithGoogle}></button>
              </div>
              <div className="hr-container">
                <hr size="2" width="30%" />
                <h6>or</h6>
                <hr size="2" width="30%" />
              </div>
              <form ref={form} onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="md-form">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="signup-username">
                      <PersonIcon size={16} className="label-icon" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="signup-username"
                      className="form-control validate"
                      value={newUserInfo.username}
                      onChange={handleChange}
                      required
                    />
                    {newUserInfo.usernameError && (
                      <p style={errorStyle}>{newUserInfo.usernameError}</p>
                    )}
                  </div>
                  <div className="md-form">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="signup-email">
                      <MailIcon size={16} className="label-icon" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="signup-email"
                      className="form-control validate"
                      value={newUserInfo.email}
                      onChange={handleChange}
                      required
                    />
                    {newUserInfo.emailError && (
                      <p style={errorStyle}>{newUserInfo.emailError}</p>
                    )}
                  </div>
                  <div className="md-form">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="signup-pass">
                      <LockIcon size={16} className="label-icon" />
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="signup-pass"
                      className="form-control validate"
                      value={newUserInfo.password}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                    <button
                      className="password-visibilty-btn"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Hide Password" : "Show Password"}
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }>
                      {showPassword ? (
                        <EyeIcon size={16} />
                      ) : (
                        <EyeClosedIcon size={16} />
                      )}
                    </button>
                  </div>
                  <div className="btn-container">
                    <button
                      type="submit"
                      className="btn form-btn btn-secondary">
                      Sign up
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <p>
                    Already have an account?{" "}
                    <Link to="/" name="Login" onClick={closeModal}>
                      Login Here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
