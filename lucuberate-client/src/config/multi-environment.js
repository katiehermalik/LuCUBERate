let origin;
let serverOrigin;
let googleSuccessUrl;
let googleFailedUrl;
let googleLoginUrl;
let loginUrl;
let logoutUrl;
let signupUrl;
let userUrl;
let categoriesUrl;
let cubesUrl;

if (process.env.NODE_ENV === "production") {
  origin = `https://www.lucuberate.com`;
  googleSuccessUrl = `${origin}/login/success`;
  googleFailedUrl = `${origin}/login/failed`;
  googleLoginUrl = `${origin}/api/v1/oauth/google`;
  loginUrl = `${origin}/api/v1/auth/login`;
  logoutUrl = `${origin}/api/v1/auth/logout`;
  signupUrl = `${origin}/api/v1/auth/signup`;
  userUrl = `${origin}/api/v1/users/currentuser`;
  categoriesUrl = `${origin}/api/v1/categories`;
  cubesUrl = `${origin}/api/v1/cubes`;
} else {
  origin = `http://localhost:3000`;
  serverOrigin = `http://localhost:4000/api/v1`;
  googleSuccessUrl = `${origin}/login/success`;
  googleFailedUrl = `${origin}/login/failed`;
  googleLoginUrl = `${serverOrigin}/oauth/google`;
  loginUrl = `${serverOrigin}/auth/login`;
  logoutUrl = `${serverOrigin}/auth/logout`;
  signupUrl = `${serverOrigin}/auth/signup`;
  userUrl = `${serverOrigin}/users/currentuser`;
  categoriesUrl = `${serverOrigin}/categories`;
  cubesUrl = `${serverOrigin}/cubes`;
}

export {
  googleSuccessUrl,
  googleFailedUrl,
  googleLoginUrl,
  loginUrl,
  logoutUrl,
  signupUrl,
  userUrl,
  categoriesUrl,
  cubesUrl,
};
