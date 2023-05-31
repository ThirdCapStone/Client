import axios from "axios";
import API_KEY from "./env";
const HOST_URL = "http://localhost:8000";
const headers = {
  "Content-Type": "application/json",
};

class Account {
  static login = async (userID, userPWD) => {
    const response = await axios
      .post(
        `${HOST_URL}/account/login`,
        {
          id: userID,
          password: userPWD,
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

  static signup = async (
    userID,
    userPWD,
    userNickname,
    userEmail,
    userPhone
  ) => {
    const response = await axios
      .put(
        `${HOST_URL}/account/signup`,
        {
          id: userID,
          password: userPWD,
          nickname: userNickname,
          email: userEmail,
          phone: userPhone,
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

  static checkDuplicate = async (userID, userNickname) => {
    const response = await axios
      .post(
        `${HOST_URL}/account/check`,
        {},
        {
          headers: headers,
          params: {
            id: userID,
            nickname: userNickname,
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

  static sendEmail = async (userEmail) => {
    const response = await axios
      .post(
        `${HOST_URL}/account/email/send`,
        {},
        {
          headers: headers,
          params: {
            email: userEmail,
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
  static verifyEmail = async (userEmail, verifyCode) => {
    const response = await axios
      .post(
        `${HOST_URL}/account/email/cancel`,
        {},
        {
          headers: headers,
          params: {
            email: userEmail,
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
  static forgotPassword = async (userID, userPWD, userEmail) => {
    const response = await axios
      .patch(
        `${HOST_URL}/account/update/password`,
        {
          id: userID,
          email: userEmail,
          new_password: userPWD,
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
  static loadUserInfo = async (accountSeq = null, userID = null) => {
    const response = await axios
      .get(
        `${HOST_URL}/account`,
        {},
        {
          headers: Object.assign(headers, { access_token: API_KEY }),
          params: {
            account_seq: accountSeq,
            id: userID,
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
}
export default Account;
