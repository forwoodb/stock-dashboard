"use client";
import React from "react";
import Button from "../components/Button";
import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <>
      <h2>Log In</h2>
      <AuthForm mode={"login"} />
    </>
  );
};

export default Login;
