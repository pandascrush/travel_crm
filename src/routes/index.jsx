import AdminDashboard from "../../src/pages/admin/AdminDashboard";
import Activity from "../pages/admin/TripManagement/Activity/Activity";
import DestinationCreation from "../pages/admin/TripManagement/Destination/DestinationCreation";
import DestinationList from "../pages/admin/TripManagement/Destination/DestinationList";
import TourList from "../pages/admin/TripManagement/Tour/TourList";
import TourCreation from "../pages/admin/TripManagement/Tour/TourCreation";
import TourCategory from "../pages/admin/TripManagement/Category/TourCategory";
import TourType from "../pages/admin/TripManagement/TourType/TourType";
import BlogsCategory from "../pages/admin/Blogs/Category/BlogsCategory";
import BlogsList from "../pages/admin/Blogs/BlogsList";
import BlogsCreation from "../pages/admin/Blogs/BlogsCreation";
import HotelList from "../pages/admin/HotelManagement/HotelList";
import HotelCreation from "../pages/admin/HotelManagement/HotelCreation";
import ActivityBookingListing from "../pages/admin/ActivityBooking/ActivityBookingListing";
import ActivityBookingCreation from "../pages/admin/ActivityBooking/ActivityBookingCreation";
import BlogsTags from "../pages/admin/Blogs/Tags/BlogsTags";
import LeadManagement from "../pages/admin/LeadManagement";
import QuoteBuilder from "../pages/admin/QuoteBuilder";
import GlobalSettings from "../pages/admin/GlobalSettings/GlobalSettings";

export const routes = [
    {
        path: "/admin-dashboard",
        component: AdminDashboard,
    },
    {
        path: "/destination-create/:id?",
        component: DestinationCreation,
    },
    {
        path: "/destination-list",
        component: DestinationList,
    },
    {
        path: "/activity",
        component: Activity,
    },
    {
        path: "/tour-list",
        component: TourList,
    },
    {
        path: "/tour-create",
        component: TourCreation,
    },
    {
        path: "/category-create",
        component: TourCategory,
    },
    {
        path: "/create-tour-type",
        component: TourType,
    },
    {
        path: "/categories-blog",
        component: BlogsCategory,
    },
    {
        path: "/tag-blogs",
        component: BlogsTags,
    },
    {
        path: "/blogs-List",
        component: BlogsList,
    },
    {
        path: "/blogs-create/:id?",
        component: BlogsCreation,
    },
    {
        path: "/hotel-List",
        component: HotelList,
    },
    {
        path: "/hotel-create",
        component: HotelCreation,
    },
    {
        path: "/Activity-list",
        component: ActivityBookingListing,
    },
    {
        path: "/Activity-create",
        component: ActivityBookingCreation,
    },
    {
        path: "/lead-management",
        component: LeadManagement,
    },
    {
        path: "/quote-builder",
        component: QuoteBuilder,
    },
    {
        path: "/global-settings",
        component: GlobalSettings,
    },
    // {
    //     path: "/comprehensive-quote-builder",
    //     component: ComprehensiveQuoteBuilder,
    // }
]


export const client_routes = [
    {
        path: "/admin-dashboard",
    },
    {
        path: "/destination-create/:id?",
    },
    {
        path: "/destination-list",
    },
]