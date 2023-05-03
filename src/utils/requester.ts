import axios from "axios";

const HOST_URL = "http://3.145.57.17";
const headers = {
  "Content-Type": "application/json",
};

const AccountLogin = async (userId: string, userPassword: string) => {
  const response = await axios
    .post(
      `${HOST_URL}/account/login`,
      {
        id: userId,
        password: userPassword,
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
  userId: string,
  userPassword: string,
  userNickname: string,
  userEmail: string,
  userPhone: string
) => {
  const response = await axios
    .put(
      `${HOST_URL}/account/signup`,
      {
        id: userId,
        password: userPassword,
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

export { AccountLogin, AccountSignup };
