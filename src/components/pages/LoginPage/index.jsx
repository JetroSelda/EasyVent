import NavigationMenu from "../../custom-ui/NavigationMenu";
import Footer from "../../custom-ui/Footer";
import LoginForm from "./Form";

const LoginPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-1xl">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage;
