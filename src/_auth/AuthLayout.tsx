import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <section className="flex flex-1 flex-col justify-center items-center py-10">
            <Outlet />
          </section>

          <img 
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block w-1/2 h-screen object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}
