import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LocaleProvider } from "./i18n/LocaleContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MissionsPage from "./pages/MissionsPage";
import ContactPage from "./pages/ContactPage";
import DonatePage from "./pages/DonatePage";
import MentionsPage from "./pages/MentionsPage";
import PrivacyPage from "./pages/PrivacyPage";

function PageMain({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="relative min-h-[50vh] bg-page">
      {children}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/a-propos"
            element={
              <PageMain>
                <AboutPage />
              </PageMain>
            }
          />
          <Route
            path="/missions"
            element={
              <PageMain>
                <MissionsPage />
              </PageMain>
            }
          />
          <Route
            path="/contact"
            element={
              <PageMain>
                <ContactPage />
              </PageMain>
            }
          />
          <Route
            path="/don"
            element={
              <PageMain>
                <DonatePage />
              </PageMain>
            }
          />
          <Route
            path="/mentions-legales"
            element={
              <PageMain>
                <MentionsPage />
              </PageMain>
            }
          />
          <Route
            path="/confidentialite"
            element={
              <PageMain>
                <PrivacyPage />
              </PageMain>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </LocaleProvider>
    </BrowserRouter>
  );
}
