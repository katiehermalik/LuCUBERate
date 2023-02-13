import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Lucuberate | Login Success";
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <div class="success-animation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="checkmark"
        viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path
          class="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
};

export default Login;
