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
  LoadingContext,
  GuideContext,
  UserContext,
  LayoutContext,
  CubeContext,
} from "../../../../context/ContextProvider";
import AuthAPI from "../../../../utils/api/auth";
import { googleLoginUrl } from "../../../../config/multi-environment";
import "./style.css";

const SignUpModal = ({
  showSignUpModal,
  setShowSignUpModal,
  setShowLoginModal,
}) => {
  const navigate = useNavigate();
  const form = useRef(null);
  const { setAppIsLoading } = useContext(LoadingContext);
  const { setCurrentUserInfo } = useContext(UserContext);
  const { setShowGuide } = useContext(GuideContext);
  const { setShowSidePanel } = useContext(LayoutContext);
  const { setCurrentCubeId } = useContext(CubeContext);
  const [showCriteria, setShowCriteria] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    usernameExistsError: "",
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
      usernameExistsError: "",
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
    setIsLoadingButton(true);
    newUserInfo.isRegistering = true;
    const userInfo = await AuthAPI.signup(newUserInfo);
    const {
      userData,
      isAuth,
      usernameExistsError,
      usernameError,
      emailExistsError,
      emailValidationError,
      passwordError,
    } = userInfo;
    setNewUserInfo(prevState => ({
      ...prevState,
      usernameExistsError: usernameExistsError ? usernameExistsError : "",
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
      setAppIsLoading(true);
      setCurrentUserInfo(userData);
      setCurrentCubeId(userData.categories[2].cubes[0]);
      setShowSignUpModal(false);
      setShowGuide(true);
      setShowSidePanel(false);
      setNewUserInfo({
        username: "",
        email: "",
        password: "",
        usernameExistsError: "",
        usernameError: "",
        emailExistsError: "",
        emailValidationError: "",
        passwordError: "",
      });
      setIsLoadingButton(false);
      navigate(`/dashboard/cube/${userData.categories[2].cubes[0]}`);
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
      {showSignUpModal && (
        <div
          className="modal signup-login"
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
              <form ref={form} onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
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
                      className="form-control"
                      value={newUserInfo.username}
                      onChange={handleChange}
                      maxLength="20"
                      required
                    />
                    {newUserInfo.usernameExistsError && (
                      <p className="error-message">
                        {newUserInfo.usernameExistsError}
                      </p>
                    )}
                    {newUserInfo.usernameError && (
                      <p className="error-message">
                        {newUserInfo.usernameError}
                      </p>
                    )}
                    <small className="input-criteria">
                      *Username must be 3-20 alphanumeric characters
                    </small>
                  </div>
                  <div className="form-group">
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
                      className="form-control"
                      value={newUserInfo.email}
                      onChange={handleChange}
                      required
                    />
                    {newUserInfo.emailExistsError && (
                      <p className="error-message">
                        {newUserInfo.emailExistsError}
                      </p>
                    )}
                    {newUserInfo.emailValidationError && (
                      <p className="error-message">
                        {newUserInfo.emailValidationError}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
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
                      className="form-control"
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
                      <p className="error-message">
                        {newUserInfo.passwordError}
                      </p>
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
                      className={`btn form-btn btn-primary ${
                        isLoadingButton ? "loading" : ""
                      }`}>
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

export default SignUpModal;
