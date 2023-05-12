import axios from "axios";
import qs from "qs";

const HOST_URL = "http://15.164.100.29";
const headers = {
  "Content-Type": "application/json",
};

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};

const AccountLogin = async (userID: string, userPWD: string) => {
  const response = await axios
    .post(
      `${HOST_URL}/account/login`,
      {
        id: userID.trim(),
        password: userPWD.trim(),
      },
      {
        headers: headers,
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

const AccountSignup = async (
  userID: string,
  userPWD: string,
  userNickname: string,
  userEmail: string,
  userPhone: string
) => {
  const response = await axios
    .put(
      `${HOST_URL}/account/signup`,
      {
        id: userID.trim(),
        password: userPWD.trim(),
        nickname: userNickname.trim(),
        email: userEmail.trim(),
        phone: userPhone.trim(),
      },
      {
        headers: headers,
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

const AccountCheckDuplicate = async (userID: string, userNickname: string) => {
  const response = await axios
    .post(
      `${HOST_URL}/account/check`,
      {},
      {
        headers: headers,
        params: {
          id: userID.trim(),
          nickname: userNickname.trim(),
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

const AccountSendEmail = async (userEmail: string) => {
  const response = await axios
    .post(
      `${HOST_URL}/account/email/send`,
      {},
      {
        headers: headers,
        params: {
          email: userEmail.trim(),
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

const AccountVerifyEmail = async (
  userEmail: string,
  verifyCode: number = 0
) => {
  const response = await axios
    .post(
      `${HOST_URL}/account/email/cancel`,
      {},
      {
        headers: headers,
        params: {
          email: userEmail.trim(),
          verify_code: verifyCode,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return response;
};

export {
  AccountLogin,
  AccountSignup,
  AccountCheckDuplicate,
  AccountSendEmail,
  AccountVerifyEmail,
};
