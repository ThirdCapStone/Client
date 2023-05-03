const validateID = (userID: string) => {
  if (userID === "") {
    return "아이디를 입력해주세요.";
  } else if (userID.length < 8) {
    return "8자 이상을 입력해주세요.";
  } else if (userID.length > 12) {
    return "12자 이하를 입력해주세요.";
  }

  return "";
};

const validatePWD = (userPWD: string) => {
  if (userPWD === "") {
    return "비밀번호를 입력해주세요.";
  } else if (userPWD.length < 8) {
    return "8자 이상을 입력해주세요.";
  } else if (userPWD.length > 15) {
    return "15자 이하를 입력해주세요.";
  }

  return "";
};

const validatePWDCheck = (userPWD: string, userPWDCheck: string) => {
  const result = validatePWD(userPWDCheck);
  if (result === "") {
    if (userPWD !== userPWDCheck) {
      return "비밀번호가 일치하지 않습니다.";
    } else {
      return result;
    }
  } else {
    return "";
  }
};

const validateNickname = (userNickname: string) => {
  if (userNickname === "") {
    return "닉네임을 입력해주세요.";
  } else if (userNickname.length < 8) {
    return "8자 이상을 입력해주세요.아림공주";
  } else if (userNickname.length > 15) {
    return "15자 이하를 입력해주세요.";
  }

  return "";
};

const validateEmail = (userEmail: string) => {
  const reEmail = new RegExp(
    "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
  );
  if (userEmail === "") {
    return "이메일을 입력해주세요.";
  } else if (!reEmail.test(userEmail)) {
    return "이메일의 형태가 맞지 않습니다.";
  }

  return "";
};

const validatePhone = (userPhone: string) => {
  const rePhone = new RegExp("[0-9]{3}-[0-9]{4}-[0-9]{4}");
  if (userPhone === "") {
    return "전화번호를 입력해주세요.";
  } else if (!rePhone.test(userPhone)) {
    return "전화번호 형태가 맞지 않습니다.";
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
