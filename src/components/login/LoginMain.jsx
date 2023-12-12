import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

const LoginMain = ({ setPassword, setUsername, rememberMe, setRememberMe }) => {
    return (
        <>
            <label
                htmlFor="username"
                className="block text-900 text-xl font-medium mb-1"
            >
                Email
            </label>
            <InputText
                id="username"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email address"
                className="p-inputtext-sm w-full md:w-30rem mb-3"
                style={{ zIndex: 200, backgroundColor: "white" }}
            />

            <label
                htmlFor="password"
                className="block text-900 font-medium text-xl mb-1"
            >
                Password
            </label>
            <Password
                inputId="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                toggleMask
                feedback={false}
                className="p-inputtext-sm w-full md:w-30rem mb-3"
                inputClassName="w-full md:w-30rem"
            />
            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                    <Checkbox
                        inputId="remember_me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.checked ?? false)}
                        className="mr-2"
                    />
                    <label htmlFor="remember_me">Remember me</label>
                </div>
            </div>
        </>
    );
};
export default LoginMain;
