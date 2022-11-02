import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import UserModel from "../../models/user";
import { PersonIcon, MailIcon, LockIcon } from "@primer/octicons-react";

const SignUp = ({
  history,
  auth,
  showSignUpModal,
  setShowSignUpModal,
  setShowLoginModal,
}) => {
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    emailError: "",
    passwordError: "",
    usernameError: "",
  });

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
    setShowSignUpModal(false);
    e.target.name === "Login" && setShowLoginModal(true);
  };

  const handleChange = event => {
    setNewUserInfo(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log("handle change", event);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (newUserInfo.password === newUserInfo.password_confirmation) {
      UserModel.create(newUserInfo).then(data => {
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
            setNewUserInfo(data);
            // Passing currentUser info to parent component (App.js)
            auth(data);
            localStorage.setItem("user", JSON.stringify(data));
            if (data.currentUser) {
              history.push("/dashboard");
              window.location.reload();
            }
          }
        }
      });
    } else {
      setNewUserInfo(prevState => ({
        ...prevState,
        passwordError: "Passwords do not match",
      }));
      validateUsername();
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
              <form onSubmit={handleSubmit}>
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
                      type="password"
                      name="password"
                      id="signup-pass"
                      className="form-control validate"
                      value={newUserInfo.password}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="md-form">
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="signup-pass-confirm">
                      <LockIcon size={16} className="label-icon" />
                      Password Confirmation
                    </label>
                    <input
                      type="password"
                      name="password_confirmation"
                      id="signup-pass-confirm"
                      className="form-control validate"
                      value={newUserInfo.password_confirmation}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                    />
                    {newUserInfo.passwordError && (
                      <p style={errorStyle}>{newUserInfo.passwordError}</p>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="form-btn btn-secondary">
                    Sign up
                  </button>
                  <hr size="2" width="70%" />
                  <p>
                    Already have an account?{" "}
                    <Link name="Login" onClick={closeModal}>
                      Login
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

export default withRouter(SignUp);
