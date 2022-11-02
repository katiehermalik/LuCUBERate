import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import UserModel from "../../models/user";
import { MailIcon, LockIcon } from "@primer/octicons-react";

const Login = ({
  history,
  auth,
  showLoginModal,
  setShowLoginModal,
  setShowSignUpModal,
}) => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    userError: "",
    matchError: "",
  });

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

  const handleSubmit = e => {
    e.preventDefault();
    console.log(userInput);
    UserModel.login(userInput).then(data => {
      console.log("DATA", data);
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
        setUserInput(data);
        // Passing currentUser info to parent component (App.js)
        auth(data);
        localStorage.setItem("user", JSON.stringify(data));
        if (data.currentUser) {
          history.push("/dashboard");
          window.location.reload();
        }
        console.log("This is the response from the user Model", data);
      }
    });
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
                  <button type="submit" className="form-btn btn-secondary">
                    Login
                  </button>
                  <hr size="2" width="70%" />
                  <p>
                    Don't yet have an account?{" "}
                    <Link
                      name="SignUp"
                      onClick={closeModal}
                      data-dismiss="modal"
                      data-toggle="modal"
                      data-target="#modalRegisterForm">
                      Sign up
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

export default withRouter(Login);
