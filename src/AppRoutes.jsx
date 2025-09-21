import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DestinationFilters from "./pages/user/DestinationFilters";
import TourOverview from "./pages/user/TourOverview";
import Layout from "./container/Layout";
import Blogs from "./pages/user/Blogs";
import BlogsDetail from "./pages/user/BlogsDetail";
import ContactUs from "./pages/user/ContactUs";
import Payments from "./pages/user/Payments";
import TermsAndConditions from "./pages/user/TermsAndConditions";
import PrivacyPolicy from "./pages/user/PrivacyPolicy";
import AboutUs from "./pages/user/AboutUs";
import DestinationPreview from "./pages/admin/TripManagement/Destination/DestinationPreview";
import SearchResults from "./pages/user/SearchResults";
import TravelForm from "./pages/user/TravelForm";
import TripsDetail from "./pages/user/TripsDetail";
import TripBookings from "./pages/user/TripBookings";

import TourPreview from "./pages/admin/TripManagement/Tour/TourPreview";
import TourBookingPreview from "./pages/admin/TripManagement/Tour/TourBookingPreview";
import LoginPage from "./pages/admin/Auth/LoginPage";
import { CommonLayout } from "./layouts/commonLayout";
import ClientLayout from "./pages/client/common/ClientLayout";

const DestinationDetail = lazy(() => import("./pages/user/DestinationDetail"));
const Homepage = lazy(() => import("./pages/user/Homepage"));

const AppRoutes = () => {
    return (
        <Router basename="/travel_crm_frontend/">
            <Routes>
                <Route element={<CommonLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/destination" element={<DestinationDetail />} />
                    <Route path="/destination-list" element={<DestinationFilters />} />
                    <Route path="/search-results" element={<SearchResults />} />
                    <Route path="/travel-form" element={<TravelForm />} />
                    <Route path="/tour-overview" element={<TourOverview />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs-detail" element={<BlogsDetail />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/Payments" element={<Payments />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/trips-detail" element={<TripsDetail />} />
                    <Route path="/trips-bookings" element={<TripBookings />} />

                    {/* Preview */}
                    <Route path="/destination/:slug?/:id?" element={<DestinationPreview />} />
                    <Route path="/trip-preview/:slug?/:id?" element={<TourPreview />} />
                    <Route path="/booking/:slug?/:id?" element={<TourBookingPreview />} />
                </Route>

                <Route path="/admin/*" element={<Layout />} />
                <Route path="/dashboard/*" element={<ClientLayout />} />
                <Route path="/admin-login" element={<LoginPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
