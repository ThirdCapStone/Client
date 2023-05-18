import axios from "axios";
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

  static checkDuplicate = async (userID, userNickname) => {
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
}

export default Account;
