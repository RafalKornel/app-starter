import { LoginGuard } from "@/auth/components/LoginGuard";
import { AboutPage } from "@/pages/AboutPage";
import { IndexPage } from "@/pages/IndexPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { LoginPage } from "@/auth/LoginPage";
import { RouteKeys } from "./route-keys";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={RouteKeys.Login} element={<LoginPage />} />

          <Route element={<LoginGuard />}>
            <Route path={RouteKeys.Index} element={<IndexPage />} />
            <Route path={RouteKeys.About} element={<AboutPage />} />
            <Route path={RouteKeys.Profile} element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
