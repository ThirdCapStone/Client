import axios from "axios";

const HOST_URL = "http://15.164.100.29";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

class Account {
  static login = async (userID: string, userPWD: string) => {
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

  static checkDuplicate = async (userID: string, userNickname: string) => {
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

  static sendEmail = async (userEmail: string) => {
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
  static verifyEmail = async (userEmail: string, verifyCode: string) => {
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
