import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import SearchPage from "./SearchPage";
import LoginPage from "./LoginPage";
import BookService from "./BookService";
import BookHotel from "./BookHotel";
import CreateAccount from "./CreateAccount";
import ProfileSetup from "./ProfileSetup";
import Dashboard from "./Dashboard";
import Services from "./Dashboard/components/Services";
import Bookings from "./Dashboard/components/Bookings";
import Messages from "./Dashboard/components/Messages";
import Profile from "./Dashboard/components/Profile";
import ServiceForm from "./Dashboard/components/Services/form/ServiceForm";
import ServiceDetails from "./Dashboard/components/Services/components/ServiceDetails";
import AdminPage from "./Dashboard/components/Admin";
import ServiceVerify from "./Dashboard/components/Admin/component/ServiceVerify";
import InvitationForm from "./InvitationForm";
import SettingsPage from "./Dashboard/components/Settings";
import AboutPage from "./AboutPage";
import PolicyPage from "./PolicyPage";
import TermsPage from "./TermsPage";
import ContactPage from "./ContactPage";
import ForgotPage from "./ForgotPage";
import Analytics from "./Dashboard/components/Analytics";
import FeedbackPage from "./Dashboard/components/Feedbacks";
import Listing from "./Listing";
import Verification from "./Verification";
import ServiceListing from "./Dashboard/components/ServiceListing";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/dashboard/",
      element: <Dashboard />,
      children: [
        {
          path: "",
          element: <Analytics />
        },
        {
          path: "services",
          element: <Services />
        },
        {
          path: "services/form",
          element: <ServiceForm />
        },
        {
          path: "services/details",
          element: <ServiceDetails />
        },
        {
          path: "bookings",
          element: <Bookings />
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "messages",
          element: <Messages />
        },
        {
          path: "feedback",
          element: <FeedbackPage />
        },
        {
          path: "serviceListing",
          element: <ServiceListing />
        },
        {
          path: "admin",
          element: <AdminPage />
        },
        {
          path: "admin/service",
          element: <ServiceVerify />
        },
        {
          path: "settings",
          element: <SettingsPage />
        },
      ]
    },
    {
      path: "/search",
      element: <SearchPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/forgot",
      element: <ForgotPage />
    },
    {
      path: "/listing",
      element: <Listing />
    },
    {
      path: "/verification",
      element: <Verification />
    },
    {
      path: "/signup",
      element: <CreateAccount />,
    },
    {
      path: "/invitation",
      element: <InvitationForm />
    },
    {
      path: "/signup/profile",
      element: <ProfileSetup />,
    },
    {
      path: "/independentservice",
      element: <BookService />
    },
    {
      path: "/servicehotel",
      element: <BookHotel />
    },
    {
      path: "about",
      element: <AboutPage />
    },
    {
      path: "policy",
      element: <PolicyPage />
    },
    {
      path: "terms",
      element: <TermsPage />
    },
    {
      path: "contact",
      element: <ContactPage />
    },
    {
      path: "/*",
      element: <LandingPage />,
    },
    {
      path: "/",
      element: <LandingPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
