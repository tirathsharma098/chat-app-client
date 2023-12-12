import React, { useCallback, useContext, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import presenceSvg from "../../assets/logos/logo-color.png";
import { useSubmit } from "react-router-dom";
import LoginMain from "./LoginMain";
import { FORM_TYPE } from "../../pages/Login";
import Signup from "./Signup";

const Login = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    let submit = useSubmit();

    const setAuthPage = (authPageToGo) => {
        props.setAuthPage(authPageToGo);
    };

    const containerClassName = classNames(
        "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    );

    const onSubmitForm = useCallback(() => {
        const data =
            FORM_TYPE.LOGIN === props.authPage
                ? { username, password, mode: props.authPage }
                : FORM_TYPE.SIGNUP === props.authPage
                ? {
                      username,
                      password,
                      full_name: fullName,
                      email,
                      mode: props.authPage,
                  }
                : {};
        submit(data, { method: "post", encType: "application/json" });
    }, [username, password, fullName, email, props.authPage, rememberMe, submit]);

    return (
        <div>
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center">
                    <div
                        style={{
                            borderRadius: "56px",
                            padding: "0.3rem",
                            marginTop: "0.3rem",
                            background:
                                "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
                        }}
                    >
                        <div
                            className="w-full surface-card py-8 px-5 sm:px-8"
                            style={{ borderRadius: "53px" }}
                        >
                            <div className="text-center mb-5">
                                <img
                                    src={`${presenceSvg}`}
                                    alt=""
                                    height="50"
                                    className="mb-3"
                                />
                                {/* <div className="text-900 text-3xl font-medium mb-3">Presence</div>
                <span className="text-600 font-medium">Take your attendance</span> */}
                            </div>

                            <div className="flex flex-column justify-content-center">
                                {props.authPage === FORM_TYPE.LOGIN && (
                                    <LoginMain
                                        setUsername={setUsername}
                                        setPassword={setPassword}
                                        rememberMe={rememberMe}
                                        setRememberMe={setRememberMe}
                                    />
                                )}
                                {props.authPage === FORM_TYPE.SIGNUP && (
                                    <Signup
                                        setFullName={setFullName}
                                        setEmail={setEmail}
                                        setUsername={setUsername}
                                        setPassword={setPassword}
                                        rememberMe={rememberMe}
                                        setRememberMe={setRememberMe}
                                    />
                                )}
                                {props.authPage === FORM_TYPE.VERIFY_EMAIL && (
                                    <>
                                        <label
                                            htmlFor="forgot_email"
                                            className="block text-900 text-xl font-medium mb-1"
                                        >
                                            Email
                                        </label>
                                        <InputText
                                            id="forgot_email"
                                            type="text"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            placeholder="Email address"
                                            className="p-inputtext-sm w-full md:w-30rem mb-3"
                                        />
                                    </>
                                )}
                                <div className="flex flex-column">
                                    <Button
                                        size="small"
                                        style={{ fontSize: "18px" }}
                                        onClick={onSubmitForm}
                                    >
                                        {props.authPage === FORM_TYPE.LOGIN &&
                                            "Sign In"}
                                        {props.authPage ===
                                            FORM_TYPE.VERIFY_EMAIL &&
                                            "Forgot Password"}
                                        {props.authPage === FORM_TYPE.SIGNUP &&
                                            "Sign Up"}
                                    </Button>
                                </div>
                                <div className="d-flex justify-content-between mt-1">
                                    <span
                                        className="font-medium no-underline cursor-pointer"
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAuthPage(FORM_TYPE.SIGNUP);
                                        }}
                                    >
                                        Signup
                                    </span>
                                    <span
                                        className="font-medium no-underline cursor-pointer"
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setAuthPage(
                                                props.authPage === "login"
                                                    ? "verify-email"
                                                    : "login"
                                            );
                                        }}
                                    >
                                        {props.authPage === "login"
                                            ? "Forgot password?"
                                            : "Login"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
