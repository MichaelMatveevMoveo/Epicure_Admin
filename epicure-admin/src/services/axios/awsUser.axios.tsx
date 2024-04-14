import axios from "axios";

export const SignUp = async (
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  birthDay: string,
  email: string,
  ID: string
) => {
  const formData = new FormData();
  formData.append("password", password);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("phone", phone);
  formData.append("birthDate", birthDay);
  formData.append("email", email);
  formData.append("id", ID);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_AWS_LAMBDA_URL}/dev/user`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(`before the if : ${response}`);
    if (response.data.error.massage) {
      return response.data.error.massage;
    }
    // console.log(`after : ${response.data.error.massage}`);
    return "";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log("!");
      // console.log(error.response?.data.error.massage);
      return error.response?.data.error.massage
        ? error.response?.data.error.massage
        : "error";
    }
    // console.log(error);
    return "error";
  }
};
