import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeClosedIcon,
  ArrowUpIcon,
} from "@primer/octicons-react";
import {
  ThemeContext,
  LoadingContext,
  UserContext,
  GuideContext,
  LayoutContext,
} from "../../../../context/ContextProvider";
import AuthAPI from "../../../../utils/api/auth";
import { googleLoginUrl } from "../../../../config/multi-environment";

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  setShowSignUpModal,
}) => {
  const navigate = useNavigate();
  const { setTheme } = useContext(ThemeContext);
  const { setAppIsLoading } = useContext(LoadingContext);
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setShowGuide } = useContext(GuideContext);
  const { setShowSidePanel } = useContext(LayoutContext);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    userError: "",
    matchError: "",
    googleMatchError: "",
  });

  const closeModal = e => {
    e.stopPropagation();
    setUserInput({
      email: "",
      password: "",
      userError: "",
      matchError: "",
      googleMatchError: "",
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
    setIsLoadingButton(true);
    userInput.isLoggingIn = true;
    const userInfo = await AuthAPI.login(userInput);
    const { userData, isAuth, userError, matchError, googleMatchError } =
      userInfo;
    setUserInput(prevState => ({
      ...prevState,
      userError: userError ? userError : "",
      matchError: matchError ? matchError : "",
      googleMatchError: googleMatchError ? googleMatchError : "",
    }));
    if (!userError && !matchError && isAuth) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
        })
      );
      setAppIsLoading(true);
      setCurrentUserInfo(userData);
      setTheme(userData.theme === "dark" ? "dark" : "light");
      setShowLoginModal(false);
      setUserInput({
        email: "",
        password: "",
        userError: "",
        matchError: "",
        googleMatchError: "",
      });
      setIsLoadingButton(false);
      if (userData.showGuideModal) {
        setShowGuide(true);
        setShowSidePanel(false);
        if (userData.cubes.length) {
          navigate(`/dashboard/cube/${userData.categories[0].cubes[0]}`);
        } else {
          navigate("/dashboard/instructions");
        }
      } else {
        navigate("/dashboard/instructions");
      }
    }
  };

  const checkForCapsLock = e => {
    if (e.getModifierState("CapsLock")) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  return (
    <>
      {showLoginModal && (
        <div
          className="modal signup-login"
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
              <div className="oauth-container">
                <a
                  onClick={() => sessionStorage.clear()}
                  className="oauth-btn google-btn"
                  alt="Sign in with Google"
                  href={googleLoginUrl}>
                  Sign in with Google
                </a>
              </div>
              <div className="hr-container">
                <hr size="2" width="30%" />
                <h6>or</h6>
                <hr size="2" width="30%" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
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
                      className="form-control"
                      value={userInput.email.toLowerCase()}
                      onChange={handleChange}
                      required
                    />
                    {userInput.userError && (
                      <p className="error-message">{userInput.userError}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="login-pass">
                      <LockIcon size={16} className="label-icon" />
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="login-pass"
                      className="form-control"
                      value={userInput.password}
                      onChange={handleChange}
                      onKeyUp={checkForCapsLock}
                      onKeyDown={checkForCapsLock}
                      onClick={checkForCapsLock}
                      required
                      autoComplete="off"
                    />
                    <div className="input-icons-container">
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
                      {capsLock ? (
                        <ArrowUpIcon size={16} className="caps-lock-warning" />
                      ) : (
                        <></>
                      )}
                    </div>
                    {userInput.matchError && (
                      <p className="error-message">{userInput.matchError}</p>
                    )}
                    {userInput.googleMatchError && (
                      <>
                        <p className="error-message">
                          {userInput.googleMatchError}{" "}
                          <a
                            style={{ fontSize: "12px", color: "#282c34" }}
                            rel="noopener noreferrer"
                            target="_blank"
                            href="mailto:support@lucuberate.com">
                            <b>support@lucuberate.com</b>
                          </a>
                        </p>
                      </>
                    )}
                  </div>
                  <div className="btn-container">
                    <button
                      type="submit"
                      className={`btn form-btn btn-primary ${
                        isLoadingButton ? "loading" : ""
                      }`}>
                      Login
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <small>
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
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
