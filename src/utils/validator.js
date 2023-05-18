const validateID = (userID) => {
  if (userID === "") {
    return "아이디를 입력해주세요.";
  } else if (userID.length < 8) {
    return "아이디는 8자 이상이어야 합니다.";
  } else if (userID.length > 16) {
    return "아이디는 16자 이하이어야 합니다.";
  }

  return "";
};

const validatePWD = (userPWD) => {
  if (userPWD === "") {
    return "비밀번호를 입력해주세요.";
  } else if (userPWD.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다.";
  } else if (userPWD.length > 16) {
    return "비밀번호는 16자 이하이어야 합니다.";
  }

  return "";
};

const validatePWDCheck = (userPWD, userPWDCheck) => {
  let result = validatePWD(userPWDCheck);
  if (result === "") {
    if (userPWD !== userPWDCheck) {
      result = "비밀번호가 일치하지 않습니다.";
    }
  }

  return result;
};

const validateNickname = (userNickname) => {
  if (userNickname === "") {
    return "닉네임을 입력해주세요.";
  } else if (userNickname.length < 5) {
    return "닉네임은 5자 이상이어야합니다.";
  } else if (userNickname.length > 20) {
    return "닉네임은 20자 이하이어야합니다.";
  }

  return "";
};

const validateEmail = (userEmail) => {
  const reEmail = new RegExp(
    "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
  );
  if (userEmail === "") {
    return "이메일을 입력해주세요.";
  } else if (!reEmail.test(userEmail)) {
    return "이메일 형식이 일치하지 않습니다. (someone@example.com)";
  }

  return "";
};

const validatePhone = (userPhone) => {
  const rePhone = new RegExp("[0-9]{3}-[0-9]{4}-[0-9]{4}");
  if (userPhone === "") {
    return "핸드폰 번호를 입력해주세요.";
  } else if (!rePhone.test(userPhone)) {
    return "핸드폰 번호 형식이 일치하지 않습니다. (000-0000-0000)";
  }

  return "";
};

export {
  validateID,
  validatePWD,
  validatePWDCheck,
  validateNickname,
  validateEmail,
  validatePhone,
};
