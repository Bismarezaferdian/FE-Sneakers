import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { tablet } from "../responsive";
import { FacebookOutlined } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import { fetchData } from "../useFetch";
import { errorMessage, successMessage } from "../utils/Toastify";
import { ToastContainer } from "react-toastify";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  /* background-color: #ffff; */
  /* opacity: 0.8; */
  ${tablet({ width: "75%" })}
`;

const Title = styled.p`
  font-size: 24px;
  /* font-weight: 600; */
  /* color: #3330e4; */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const ButtonRegister = styled.button`
  width: 80%;
  border: none;
  margin-top: 10px;
  padding: 15px 40px;
  background: #3230e4;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  align-self: center;
  border-radius: 50px;
  &:disabled {
    background: gray;
  }
`;

const Links = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  /* text-decoration: underline; */
  align-self: flex-end;
  cursor: pointer;
`;

const SecondLink = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  /* text-decoration: underline; */
  align-self: center;
  cursor: pointer;
`;

const Singup = styled(Link)`
  font-size: 14px;
  color: #3330e4;
`;

const Buttom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Google = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: none;
`;
const Facebook = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: none;
`;

const Validate = styled.span`
  color: red;
  font-size: 12px;
`;

const Register = () => {
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [isSame, setIsSame] = useState(null);
  const [firstPassword, setFirstPassword] = useState("");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    address: "",
    image: [],
    email: "",
    password: "",
    isAdmin: false,
  });
  const [fetching, setFetching] = useState({
    isFetching: false,
    error: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, firstPassword);
    if (name === "password" && value !== firstPassword) {
      console.log("data tidak sama");
      setIsSame(false);
    } else {
      setIsSame(true);
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(isSame);
  const handlefirstPassword = (event) => {
    const { name, value } = event.target;
    if (name === "password" || value !== data.password) {
      // Buat pola regex untuk memeriksa password
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
      // Lakukan pencocokan regex terhadap password
      setValidatePassword(!regex.test(value));
      setIsSame(false);
    } else {
      setIsSame(true);
    }
    setFirstPassword(value);
  };

  const runValidate = () => {
    setValidate(!validate);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("start");
      if (
        !data.firstname ||
        !data.phonenumber ||
        !data.email ||
        !data.password ||
        validatePassword ||
        isSame === false
      ) {
        runValidate();
        console.log("run");
      } else {
        setFetching((prev) => ({ ...prev, isFetching: true }));
        await fetchData.post("/auth/register", data);
        successMessage("account has been create! please login", () => {
          navigate("/login");
          console.log("finis");
        });
        setFetching((prev) => ({ ...prev, isFetching: false }));
      }
    } catch (error) {
      errorMessage(error.response.data);
      console.log(error);
      setFetching((prev) => ({ ...prev, error: error }));
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fetching.isFetching}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Top>
        <Title>Create Account </Title>
        <span>please fill the input bellow !</span>
      </Top>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "4px" }}>
            <Input
              type="text"
              name="firstname"
              placeholder="firstname"
              value={data.firstname}
              onChange={handleChange}
            />

            <Input
              type="text"
              name="lastname"
              placeholder="lastname"
              value={data.lastname}
              onChange={handleChange}
              required
              error={validate}
            />
          </div>
          {validate && !data.firstname && <Validate>is require</Validate>}

          <Input
            type="text"
            name="phonenumber"
            placeholder="phone number"
            value={data.phonenumber}
            onChange={handleChange}
          />
          {validate && !data.phonenumber && <Validate>is require</Validate>}

          <Input
            type="text"
            name="address"
            placeholder="address"
            value={data.address}
            onChange={handleChange}
          />
          {validate && !data.address && <Validate>is require</Validate>}

          <Input
            type="email"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={handleChange}
          />
          {validate && !data.email && <Validate>is require</Validate>}

          <Input
            type="text"
            name="password"
            placeholder="password"
            value={firstPassword}
            onChange={handlefirstPassword}
            autoComplete=""
          />
          {(validate && !firstPassword && <Validate>is require</Validate>) ||
            (validatePassword && (
              <Validate>
                password setidaknya satu huruf besar terdiri 6 character
                terdapat huruf dan angka{" "}
              </Validate>
            ))}
          <Input
            type="text"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={handleChange}
            autoComplete=""
          />
          {(isSame === false && <Validate>Password not match</Validate>) ||
            (validate && !data.password && <Validate>is required</Validate>)}
          <ButtonRegister
            disabled={!firstPassword || isSame === null}
            onClick={handleSubmit}
          >
            SIGN UP
          </ButtonRegister>
          <SecondLink>
            Already have an account?
            <Singup to={"/login"}> {""}Login </Singup>
          </SecondLink>
        </Form>
      </Wrapper>
      <Buttom>
        <Google>
          <GoogleIcon /> Create account With google
        </Google>
        <Facebook>
          <FacebookOutlined /> Create account With Facebook
        </Facebook>
      </Buttom>
    </Container>
  );
};

export default Register;
