import NavigationMenu from "../../custom-ui/NavigationMenu";
import Footer from "../../custom-ui/Footer";
import CreateAccountForm from "./Form";

const CreateAccount = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-1xl">
          <CreateAccountForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateAccount;
