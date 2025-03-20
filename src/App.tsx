import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MaintenanceProvider } from "@/context/MaintenanceContext";
import { MaintenanceCheck } from "@/components/MaintenanceCheck";
import { HelmetProvider } from 'react-helmet-async';
import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import EditBlogPage from "./pages/EditBlogPage";
import PopularProductsPage from "./pages/PopularProductsPage";
import ArticlePage from "./pages/ArticlePage";
import GamesPage from "./pages/GamesPage";
import TechPage from "./pages/TechPage";
import StocksPage from "./pages/StocksPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import GadgetsPage from "./pages/GadgetsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductReviewsPage from "./pages/ProductReviewsPage";
import ComparisonPage from "./pages/ComparisonPage";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <MaintenanceProvider>
            <BrowserRouter>
              <AnalyticsProvider>
                <MaintenanceCheck>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/article/:slug" element={<ArticlePage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/tech" element={<TechPage />} />
                    <Route path="/stocks" element={<StocksPage />} />
                    <Route path="/entertainment" element={<EntertainmentPage />} />
                    <Route path="/gadgets" element={<GadgetsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/product-reviews/:id" element={<ProductReviewsPage />} />
                    <Route path="/comparison" element={<ComparisonPage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin/edit/:id" element={<EditBlogPage />} />
                    <Route path="/admin/popular-products" element={<PopularProductsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MaintenanceCheck>
              </AnalyticsProvider>
            </BrowserRouter>
          </MaintenanceProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;