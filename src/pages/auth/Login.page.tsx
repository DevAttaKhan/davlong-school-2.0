import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Transition } from "@headlessui/react";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/assets/images/logo.png";
import { loginSchema, type LoginFormValues } from "./login.schema";
import { setCredentials } from "@/store/slices/auth.slice";
import { useLoginMutation } from "@/store/apis/auth.api";
import { extractApiErrorMessage } from "@/lib/extractApiErrorMessage";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginFormValues) => {
    setLoginError(null);
    try {
      const { data, error } = await login(formData);

      if (error) {
        const errorMessage = extractApiErrorMessage(error);
        setLoginError(
          errorMessage || "Login failed. Please check your credentials."
        );
        return;
      }

      if (data) {
        dispatch(
          setCredentials({
            token: data.access,
            refreshToken: data.refresh,
            user: data.user,
          })
        );
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = extractApiErrorMessage(error);
      setLoginError(
        errorMessage || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#3A80F5] via-[#2F6EEB] to-[#2156DD]">
      {/* Navbar: gradient, shadow, border, max-w content wrapper, responsive padding */}
      <nav className="shrink-0 bg-gradient-to-b from-[#3A80F5] via-[#2F6EEB] to-[#2156DD] shadow-xl border-b-2 border-[#2156DD]/50">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
          <div className="flex justify-between items-center h-16">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="flex-shrink-0 flex items-center"
            >
              <img
                src={Logo}
                alt="Dave Long Coach Travel"
                className="h-8 w-8 object-contain brightness-0 invert"
              />
            </a>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#3C549A] transition hover:bg-blue-50 hover:text-blue-800"
            >
              HOME
            </button>
          </div>
        </div>
      </nav>

      {/* Main: grid — gap from left/right corners via padding (Figma-style) */}
      <main className="flex-1 min-h-0 grid grid-cols-1 grid-rows-1 gap-0 md:grid-cols-12 md:grid-rows-12">
        {/* Left: gap from navbar matching reference (~100–120px) */}
        <div className="hidden md:flex md:col-span-6 md:row-span-12 items-center justify-center pt-[7rem] pb-12 md:pt-28 lg:pt-32">
          <div className="w-full max-w-[530px] px-4 text-center">
            {/* Circular logo: white Dave Long logo, centered */}
            <div className="mb-2 flex justify-center">
              <div className="flex h-40 w-40 shrink-0 items-center justify-center sm:h-44 sm:w-44 lg:h-56 lg:w-56 xl:h-64 xl:w-64">
                <img
                  src={Logo}
                  alt="Dave Long Coach Travel"
                  className="h-24 w-24 object-contain brightness-0 invert sm:h-28 sm:w-28 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl whitespace-nowrap">
              Coach Hire Company
            </h1>
            <p className="mt-2 text-4xl font-bold text-white sm:text-5xl lg:text-6xl whitespace-nowrap">
              West Cork
            </p>
            <p className="mt-8 text-base leading-relaxed text-white sm:text-lg lg:text-xl">
              Based in Skibbereen, Dave Long Coach Travel is West Cork&apos;s
              leading Coach & Mini Bus hire company. We pride ourselves on
              offering a wide range of coach and mini bus sizes to suit any
              group size or budget.
            </p>
          </div>
        </div>

        {/* Right: gap from navbar matching reference (~100–120px) */}
        <div className="flex col-span-1 row-span-1 md:col-span-6 md:row-span-12 items-center justify-center px-4 pt-[7rem] pb-4 md:pt-28 lg:pt-32">
          <Transition
            appear
            show
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
          >
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
              <h2 className="text-left text-2xl font-bold tracking-tight flex justify-center text-gray-900">
                Sign In
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
                noValidate
              >
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    {...register("email", {
                      onChange: () => setLoginError(null),
                    })}
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <Transition
                    show={!!errors.email}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <p className="mt-1 text-left text-sm text-red-600">
                      {errors.email?.message}
                    </p>
                  </Transition>
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Password"
                      {...register("password", {
                        onChange: () => setLoginError(null),
                      })}
                      className={`w-full rounded-lg border px-4 py-3 pr-11 text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <Transition
                    show={!!errors.password}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <p className="mt-1 text-left text-sm text-red-600">
                      {errors.password?.message}
                    </p>
                  </Transition>
                </div>

                {loginError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isLoading ? "Signing in…" : "Sign In"}
                </button>

                <div className="text-left">
                  <a
                    href="/forgot-password"
                    className="flex justify-center text-sm font-semibold text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </main>
    </div>
  );
};
