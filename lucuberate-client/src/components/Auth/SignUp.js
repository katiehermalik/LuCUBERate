import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PersonIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeClosedIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@primer/octicons-react";
import {
  UserContext,
  CubeContext,
  GuideContext,
  CategoryListContext,
} from "../../context/ContextProvider";
import UserAPI from "../../utils/api/user";
import AuthAPI from "../../utils/api/auth";
import {
  googleLoginUrl,
  googleSuccessUrl,
} from "../../config/multi-environment";

const SignUp = ({ showSignUpModal, setShowSignUpModal, setShowLoginModal }) => {
  const navigate = useNavigate();
  const form = useRef(null);
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setCurrentCubeId } = useContext(CubeContext);
  const { setShowGuide } = useContext(GuideContext);
  const { setShowCategoryList } = useContext(CategoryListContext);
  const [showCriteria, setShowCriteria] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    usernameError: "",
    emailExistsError: "",
    emailValidationError: "",
    passwordError: "",
  });

  const closeModal = e => {
    e.stopPropagation();
    setNewUserInfo({
      username: "",
      email: "",
      password: "",
      usernameError: "",
      emailExistsError: "",
      emailValidationError: "",
      passwordError: "",
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
    const userInfo = await AuthAPI.signup(newUserInfo);
    const {
      userData,
      isAuth,
      emailExistsError,
      emailValidationError,
      passwordError,
      usernameError,
    } = userInfo;
    setNewUserInfo(prevState => ({
      ...prevState,
      usernameError: usernameError ? usernameError : "",
      emailExistsError: emailExistsError ? emailExistsError : "",
      emailValidationError: emailValidationError ? emailValidationError : "",
      passwordError: passwordError ? passwordError : "",
    }));
    if (isAuth) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
        })
      );
      setCurrentUserInfo(userData);
      setCurrentCubeId(userData.categories[2].cubes[0]);
      setShowSignUpModal(false);
      setShowGuide(true);
      setShowCategoryList(false);
      setNewUserInfo({
        username: "",
        email: "",
        password: "",
        usernameError: "",
        emailExistsError: "",
        emailValidationError: "",
        passwordError: "",
      });
      navigate(`/dashboard/${userData.categories[2].cubes[0]}`);
    }
  };

  const fetchOAuthUser = async () => {
    const userInfo = await UserAPI.userData();
    const { userData, isAuth } = userInfo;
    if (isAuth) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          isLoggedIn: true,
        })
      );
      setCurrentUserInfo(userData);
      setCurrentCubeId(userData.categories[2].cubes[0]);
      setShowSignUpModal(false);
      setShowGuide(true);
      setShowCategoryList(false);
      navigate(`/dashboard/${userData.categories[2].cubes[0]}`);
    }
  };

  const signUpWithGoogle = async () => {
    const newWindow = (url, windowName, win, w, h) => {
      const y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
      const x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
      return win.open(
        url,
        windowName,
        `width=${w}, height=${h}, top=${y}, left=${x}`
      );
    };
    const popup = newWindow(googleLoginUrl, "popup", window, 500, 600);
    const checkPopup = setInterval(() => {
      if (
        !popup.closed &&
        popup.window.location.href.includes(googleSuccessUrl)
      ) {
        popup.close();
        fetchOAuthUser();
      }
      if (!popup || !popup.closed) return;
      clearInterval(checkPopup);
    }, 1000);
  };

  const checkForCapsLock = e => {
    if (e.getModifierState("CapsLock")) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
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
                      maxLength="20"
                      required
                    />
                    {newUserInfo.usernameError && (
                      <p style={errorStyle}>{newUserInfo.usernameError}</p>
                    )}
                    <small className="input-criteria">
                      *Username must be 3-20 alphanumeric characters
                    </small>
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
                      type="text"
                      name="email"
                      id="signup-email"
                      className="form-control validate"
                      value={newUserInfo.email}
                      onChange={handleChange}
                      required
                    />
                    {newUserInfo.emailExistsError && (
                      <p style={errorStyle}>{newUserInfo.emailExistsError}</p>
                    )}
                    {newUserInfo.emailValidationError && (
                      <p style={errorStyle}>
                        {newUserInfo.emailValidationError}
                      </p>
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
                      onKeyUp={checkForCapsLock}
                      onKeyDown={checkForCapsLock}
                      onClick={checkForCapsLock}
                      maxLength="15"
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
                    {newUserInfo.passwordError && (
                      <p style={errorStyle}>{newUserInfo.passwordError}</p>
                    )}

                    <small className="input-criteria password-criteria">
                      {showCriteria ? (
                        <>
                          <div onClick={() => setShowCriteria(!showCriteria)}>
                            Hide password criteria
                            <ChevronDownIcon size={16} />
                          </div>
                          <ul>
                            <li>
                              Should have at least one numerical digit(0-9)
                            </li>
                            <li>
                              Length should be in between 8 to 15 characters
                            </li>
                            <li>
                              Should have at least one lowercase letter(a-z)
                            </li>
                            <li>
                              Should have at least one uppercase letter(A-Z)
                            </li>
                            <li>
                              Should have at least one special character ( @, #,
                              %, &, !, $, *)
                            </li>
                          </ul>
                        </>
                      ) : (
                        <div onClick={() => setShowCriteria(!showCriteria)}>
                          View password criteria
                          <ChevronRightIcon size={16} />
                        </div>
                      )}
                    </small>
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
                  <small>
                    Already have an account?{" "}
                    <Link to="/" name="Login" onClick={closeModal}>
                      Login Here
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

export default SignUp;
