import { useCallback, useState } from "react";
import { signUpText } from "../resources/signUpPage.resources";
import "./signUpPage.style.scss";
import { SignUp } from "../services/axios/awsUser.axios";
import { appRoutes, withBase } from "../shared/constants/route.constants";
// import { appRoutes, withBase } from "../shared/constants/route.constants";
export const SignUpPage = () => {
  const [passwoed, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [badInputMassage, setBadInputMassage] = useState("");

  const signUpClickHandel = useCallback(async () => {
    const errorMassage: string = await SignUp(
      passwoed,
      firstName,
      lastName,
      phone,
      birthDay,
      email,
      ID
    );
    // console.log(!errorMassage);
    // console.log(`errorMassage = ${errorMassage}`);
    setBadInputMassage("");
    if (!errorMassage) {
      window.location.href = withBase(appRoutes.login);
    }
    setBadInputMassage(errorMassage);
  }, [ID, birthDay, email, firstName, lastName, passwoed, phone]);
  return (
    <div className="divMainSignUp">
      <h1>{signUpText.title}</h1>
      <div className="divFormSignUp">
        <label htmlFor="passwoed">{signUpText.passwoedLable}</label>
        <input
          type="password"
          value={passwoed}
          onChange={(event) => setPassword(event.currentTarget.value)}
        ></input>

        <label htmlFor="firstName">{signUpText.firstNameLabel}</label>
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        ></input>

        <label htmlFor="lastName">{signUpText.lastNameLabel}</label>
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        ></input>

        <label htmlFor="phone">{signUpText.phoneLabel}</label>
        <input
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
        ></input>

        <label htmlFor="birthDay">{signUpText.birthDayLabel}</label>
        <input
          type="text"
          value={birthDay}
          onChange={(event) => setBirthDay(event.currentTarget.value)}
        ></input>

        <label htmlFor="email">{signUpText.emailLabel}</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        ></input>

        <label htmlFor="ID">{signUpText.idLabel}</label>
        <input
          type="text"
          value={ID}
          onChange={(event) => setID(event.currentTarget.value)}
        ></input>
      </div>
      {badInputMassage && <p className="pNotice">{badInputMassage}</p>}
      <button className="myButton" onClick={signUpClickHandel}>
        {signUpText.buttonText}
      </button>
    </div>
  );
};
