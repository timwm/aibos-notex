import BorderAnimation from "~/components/border-animation";

const credentials = [
  {
    email: "yitehah157@foxroids.com",
    password: "yitehah157@foxroids.com",
  },
  {
    email: "dobox25109@nrlord.com",
    password: "dobox25109@nrlord.com",
  },
];

function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // <main className="grid min-h-screen place-content-center dark:bg-neutral-700">
    <main className="flex flex-col gap-y-8 lg:flex-row">
      {children}
      <BorderAnimation className="my-auto h-fit">
        <h1 className="mb-4 text-xl font-semibold text-white">
          Test credentials:
        </h1>
        {credentials.map((cred, index) => (
          <div key={index} className="mb-2 text-left">
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {cred.email}
            </p>
            <p>
              <span className="font-semibold text-white">Password:</span>{" "}
              {cred.password}
            </p>
          </div>
        ))}
      </BorderAnimation>
    </main>
  );
}

export default AuthLayout;
