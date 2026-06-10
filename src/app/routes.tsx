import { createBrowserRouter, Outlet } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OTPVerification from "./pages/OTPVerification";
import VendorRegistration from "./pages/VendorRegistration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorVerification from "./pages/admin/VendorVerification";
import VendorVerificationDetail from "./pages/admin/VendorVerificationDetail";
import UnitPengusulDashboard from "./pages/unit/UnitPengusulDashboard";
import PengajuanForm from "./pages/unit/PengajuanForm";
import PengajuanList from "./pages/unit/PengajuanList";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import PaketLelangList from "./pages/vendor/PaketLelangList";
import PaketLelangDetail from "./pages/vendor/PaketLelangDetail";
import UploadPenawaran from "./pages/vendor/UploadPenawaran";
import SanggahanForm from "./pages/vendor/SanggahanForm";
import PanitiaDashboard from "./pages/panitia/PanitiaDashboard";
import EvaluasiPaket from "./pages/panitia/EvaluasiPaket";
import ErrorPage from "./pages/ErrorPage";
import UnderConstruction from "./pages/UnderConstruction";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/otp",
        Component: OTPVerification,
      },
      {
        path: "/register-vendor",
        Component: VendorRegistration,
      },
      // Admin Routes
      {
        path: "/admin",
        Component: AdminDashboard,
      },
      {
        path: "/admin/verifikasi-vendor",
        Component: VendorVerification,
      },
      {
        path: "/admin/verifikasi-vendor/:vendorId",
        Component: VendorVerificationDetail,
      },
      {
        path: "/admin/audit-log",
        Component: UnderConstruction,
      },
      // Unit Pengusul Routes
      {
        path: "/unit",
        Component: UnitPengusulDashboard,
      },
      {
        path: "/unit/pengajuan-baru",
        Component: PengajuanForm,
      },
      {
        path: "/unit/pengajuan-saya",
        Component: PengajuanList,
      },
      // Vendor Routes
      {
        path: "/vendor",
        Component: VendorDashboard,
      },
      {
        path: "/vendor/paket-lelang",
        Component: PaketLelangList,
      },
      {
        path: "/vendor/paket-lelang/:paketId",
        Component: PaketLelangDetail,
      },
      {
        path: "/vendor/upload-penawaran",
        Component: UnderConstruction,
      },
      {
        path: "/vendor/upload-penawaran/:paketId",
        Component: UploadPenawaran,
      },
      {
        path: "/vendor/sanggahan/:paketId",
        Component: SanggahanForm,
      },
      {
        path: "/vendor/notifikasi",
        Component: UnderConstruction,
      },
      // Panitia Routes
      {
        path: "/panitia",
        Component: PanitiaDashboard,
      },
      {
        path: "/panitia/paket-lelang",
        Component: UnderConstruction,
      },
      {
        path: "/panitia/evaluasi",
        Component: UnderConstruction,
      },
      {
        path: "/panitia/evaluasi/:paketId",
        Component: EvaluasiPaket,
      },
      // Catch-all route for 404
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);
