import React, { useState, useEffect } from "react";
import { useGetPositionsQuery, useSignUpMutation } from "../features/users/usersApiSlice";
import "../styles/SignUp.sass";
import { isFormValid } from "../util/isFormValid";
import Success from "./Success";
import Button from "./UI/Button";
import Container from "./UI/Container";
import FileUpload from "./UI/FileUpload";
import Input from "./UI/Input";
import Radio from "./UI/Radio";

const SignUp = () => {
  const { data, isError } = useGetPositionsQuery();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(1);
  const [image, setImage] = useState<File | undefined>();

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const [imageErrorMsg, setImageErrorMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [signup, { isSuccess }] = useSignUpMutation();

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();

    const validation = await isFormValid({ name: name.trim(), email, phone, image });
    const { nameErr, phoneErr, emailErr, imageErr } = validation;
    console.log(validation);

    if (Object.values(validation).find((item) => item !== "")) {
      if (nameErr) setNameErrorMsg(nameErr);
      if (emailErr) setEmailErrorMsg(emailErr);
      if (phoneErr) setPhoneErrorMsg(phoneErr);
      if (imageErr) setImageErrorMsg(imageErr);
      return;
    }

    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("phone", phone);
    body.append("position_id", position.toString());
    body.append("photo", image as File);
    try {
      await signup(body).unwrap();
    } catch (err: any) {
      console.log(err);
      if (err?.data?.message) return setErrMsg(err?.data?.message);
      setErrMsg("Error! Go to console for details");
    }
  };

  useEffect(() => {
    if (nameErrorMsg) setNameErrorMsg("");
    if (emailErrorMsg) setEmailErrorMsg("");
    if (phoneErrorMsg) setPhoneErrorMsg("");
    if (imageErrorMsg) setImageErrorMsg("");
    if (errMsg) setErrMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, phone, position, image]);

  if (isSuccess) return <Success />;

  return (
    <div className="signup">
      <Container paddings>
        <div className="signup__inner">
          <h1 className="signup__title">Working with POST request</h1>
          {errMsg && <div className="signup__error">{errMsg}</div>}
          <form className="signup__form">
            <Input
              BoxClassName="signup__name"
              value={name}
              onChange={(value) => setName(value)}
              label="Your name"
              id="nameInput"
              error={nameErrorMsg}
              helperText={"2 - 60 symbols"}
            />
            <Input
              BoxClassName="signup__email"
              value={email}
              onChange={(value) => setEmail(value)}
              label="Email"
              id="emailInput"
              type={"email"}
              error={emailErrorMsg}
            />
            <Input
              BoxClassName="signup__phone"
              value={phone}
              onChange={(value) => setPhone(value)}
              label="Phone"
              id="phoneInput"
              type={"tel"}
              helperText={"+38 (XXX) XXX - XX - XX"}
              error={phoneErrorMsg}
            />
            <div className="signup__positions">
              <h3 className="signup__positions-title">Select your position</h3>
              {isError ? (
                <div className="signup__positions-error">
                  Error while getting positions! Try later...
                </div>
              ) : (
                data?.positions.map((item) => {
                  return (
                    <Radio
                      id={`radio + ${item.name}`}
                      key={item.id}
                      onChange={(value) => setPosition(value)}
                      checked={position === item.id}
                      value={item.id}
                      label={item.name}
                    />
                  );
                })
              )}
            </div>
            <FileUpload
              filename={image?.name}
              onChange={(file) => setImage(file)}
              error={imageErrorMsg}
              helperText="Image size: 1 - 5 MB, at least 70x70 px"
            />
            <Button
              label="SignUp"
              onClick={handleSignup}
              disabled={isError}
              className="signup__button"
            />
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
