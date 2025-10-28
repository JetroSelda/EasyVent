import Routes from './components/pages'
import RouteContextProvider from './RouteContext';
import { Toaster } from "./components/ui/sonner";

import "./App.css";

function App() {
  return (
    <>
      <RouteContextProvider>
        <Routes />
      </RouteContextProvider>

      <Toaster position="top-center" />
    </>
  )
}

export default App
