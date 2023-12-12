import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

const Signup = ({
    setFullName,
    setPassword,
    setUsername,
    rememberMe,
    setRememberMe,
    setEmail
}) => {
    return (
        <>
            <label
                htmlFor="full_name"
                className="block text-900 text-xl font-medium mb-1"
            >
                Full Name
            </label>
            <InputText
                id="full_name"
                type="text"
                name="full_name"
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="p-inputtext-sm w-full md:w-30rem mb-3"
                style={{ zIndex: 200, backgroundColor: "white" }}
            />
             <label
                htmlFor="email"
                className="block text-900 text-xl font-medium mb-1"
            >
                Email
            </label>
            <InputText
                id="email"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="p-inputtext-sm w-full md:w-30rem mb-3"
                style={{ zIndex: 200, backgroundColor: "white" }}
            />
            <label
                htmlFor="username"
                className="block text-900 text-xl font-medium mb-1"
            >
                Username
            </label>
            <InputText
                id="username"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
export default Signup;
