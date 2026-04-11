import Routes from './components/pages'
import RouteContextProvider from './RouteContext';
import { Toaster } from "./components/ui/sonner";

import "./App.css";

function App() {
  return (
    <>
      <RouteContextProvider>
        <div className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black opacity-[0.7]" />
        <Routes />
      </RouteContextProvider>

      <Toaster position="top-center" />
    </>
  )
}

export default App
