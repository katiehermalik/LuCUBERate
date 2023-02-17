const checkUsername = str => {
  const criteria = /^[A-Za-z0-9]{3,20}$/;
  return criteria.test(str);
};

const checkPassword = str => {
  const criteria = /^(?=.*\d)(?=.*[@#%&!$*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
  return criteria.test(str);
};

const checkEmail = str => {
  const criteria =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return criteria.test(str);
};

module.exports = { checkUsername, checkPassword, checkEmail };
