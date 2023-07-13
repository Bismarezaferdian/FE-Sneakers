import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { login } from "../redux/apiCall";
import GoogleIcon from "@mui/icons-material/Google";
import { mobile, tablet } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { FacebookOutlined } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/websitemuid/image/upload/v1686757853/undraw_access_account_re_8spm_1_qd3dex.svg")
      center;
  background-size: cover; */
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
`;

const Top = styled.div``;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #ffff;
  opacity: 0.8;
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

const Button = styled.button`
  width: 80%;
  border: none;
  margin-top: 10px;
  padding: 15px 40px;
  background-color: #3330e4;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  align-self: center;
  border-radius: 4px;
`;

const Links = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
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

const Singup = styled(Link)``;

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

const Span = styled.span`
  font-size: 12px;
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, massageError } = useSelector(
    (state) => state.user
  );
  // const isFetching = false;

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    // const res = await fetchData.post("/auth/login", { email, password });
    // console.log(res.data);
  };
  console.log(isFetching);

  return (
    <Container>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isFetching}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Top>
        <Title>welcome back !</Title>
      </Top>

      <Wrapper>
        {error && <Span>{massageError}</Span>}
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Links>Forgot password?</Links>
          <Button onClick={handleClick}>LOGIN</Button>
          <SecondLink>
            Dont have account?<Singup to={"/register"}>signUp</Singup>
          </SecondLink>
        </Form>
      </Wrapper>
      <Buttom>
        <Google>
          <GoogleIcon /> Login With google
        </Google>
        <Facebook>
          <FacebookOutlined /> Login With Facebook
        </Facebook>
      </Buttom>
    </Container>
  );
};

export default Login;
