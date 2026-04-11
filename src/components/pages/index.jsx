import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
const LandingPage = lazy(() => import("./LandingPage"));
const SearchPage = lazy(() => import("./SearchPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const BookService = lazy(() => import("./BookService"));
const BookHotel = lazy(() => import("./BookHotel"));
const CreateAccount = lazy(() => import("./CreateAccount"));
const ProfileSetup = lazy(() => import("./ProfileSetup"));
const Dashboard = lazy(() => import("./Dashboard"));
const Services = lazy(() => import("./Dashboard/components/Services"));
const Bookings = lazy(() => import("./Dashboard/components/Bookings"));
const Messages = lazy(() => import("./Dashboard/components/Messages"));
const Profile = lazy(() => import("./Dashboard/components/Profile"));
const ServiceForm = lazy(() => import("./Dashboard/components/Services/form/ServiceForm"));
const ServiceDetails = lazy(() => import("./Dashboard/components/Services/components/ServiceDetails"));
const AdminPage = lazy(() => import("./Dashboard/components/Admin"));
const ServiceVerify = lazy(() => import("./Dashboard/components/Admin/component/ServiceVerify"));
const SettingsPage = lazy(() => import("./Dashboard/components/Settings"));
const InvitationForm = lazy(() => import("./InvitationForm"));
const AboutPage = lazy(() => import("./AboutPage"));
const PolicyPage = lazy(() => import("./PolicyPage"));
const TermsPage = lazy(() => import("./TermsPage"));
const ContactPage = lazy(() => import("./ContactPage"));
const ForgotPage = lazy(() => import("./ForgotPage"));
const Analytics = lazy(() => import("./Dashboard/components/Analytics"));
const FeedbackPage = lazy(() => import("./Dashboard/components/Feedbacks"));
const ServiceListing = lazy(() => import("./Dashboard/components/ServiceListing"));
const Listing = lazy(() => import("./Listing"));
const Verification = lazy(() => import("./Verification"));

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/dashboard/",
      element: (
        <Suspense>
           <Dashboard />,
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
               <Analytics />
            </Suspense>
          )
        },
        {
          path: "services",
          element: (
            <Suspense>
               <Services />
            </Suspense>
          )
        },
        {
          path: "services/form",
          element: (
            <Suspense>
               <ServiceForm />
            </Suspense>
          )
        },
        {
          path: "services/details",
          element: (
            <Suspense>
               <ServiceDetails />
            </Suspense>
          )
        },
        {
          path: "bookings",
          element: (
            <Suspense>
               <Bookings />
            </Suspense>
          )
        },
        {
          path: "profile",
          element: (
            <Suspense>
               <Profile />
            </Suspense>
          )
        },
        {
          path: "messages",
          element: (
            <Suspense>
               <Messages />
            </Suspense>
          )
        },
        {
          path: "feedback",
          element: (
            <Suspense>
               <FeedbackPage />
            </Suspense>
          )
        },
        {
          path: "serviceListing",
          element: (
            <Suspense>
               <ServiceListing />
            </Suspense>
          )
        },
        {
          path: "admin",
          element: (
            <Suspense>
               <AdminPage />
            </Suspense>
          )
        },
        {
          path: "admin/service",
          element: (
            <Suspense>
               <ServiceVerify />
            </Suspense>
          )
        },
        {
          path: "settings",
          element: (
            <Suspense>
               <SettingsPage />
            </Suspense>
          )
        },
      ]
    },
    {
      path: "/search",
      element: (
        <Suspense>
           <SearchPage />
        </Suspense>
      )
    },
    {
      path: "/login",
      element: (
        <Suspense>
           <LoginPage />
        </Suspense>
      )
    },
    {
      path: "/forgot",
      element: (
        <Suspense>
           <ForgotPage />
        </Suspense>
      )
    },
    {
      path: "/listing",
      element: (
        <Suspense>
           <Listing />
        </Suspense>
      )
    },
    {
      path: "/verification",
      element: (
        <Suspense>
           <Verification />
        </Suspense>
      )
    },
    {
      path: "/signup",
      element: (
        <Suspense>
           <CreateAccount />
        </Suspense>
      )
    },
    {
      path: "/invitation",
      element: (
        <Suspense>
           <InvitationForm />
        </Suspense>
      )
    },
    {
      path: "/signup/profile",
      element: (
        <Suspense>
           <ProfileSetup />
        </Suspense>
      )
    },
    {
      path: "/independentservice",
      element: (
        <Suspense>
           <BookService />
        </Suspense>
      )
    },
    {
      path: "/servicehotel",
      element: (
        <Suspense>
           <BookHotel />
        </Suspense>
      )
    },
    {
      path: "about",
      element: (
        <Suspense>
           <AboutPage />
        </Suspense>
      )
    },
    {
      path: "policy",
      element: (
        <Suspense>
           <PolicyPage />
        </Suspense>
      )
    },
    {
      path: "terms",
      element: (
        <Suspense>
           <TermsPage />
        </Suspense>
      )
    },
    {
      path: "contact",
      element: (
        <Suspense>
           <ContactPage />
        </Suspense>
      )
    },
    {
      path: "/*",
      element: (
        <Suspense>
           <LandingPage />
        </Suspense>
      )
    },
    {
      path: "/",
      element: (
        <Suspense>
           <LandingPage />
        </Suspense>
      )
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
