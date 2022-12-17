import Footer from "./components/footer"
import NavBar from "./components/nav-bar"
import Home from "./Pages/home.page"
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"
import Auth from "./Pages/authentication.page"
import Search from "./Pages/search.page"
import NotFound404 from "./components/not-found-404"
import Advertisement from "./Pages/advertisement-details-page"
import CreateAdvertisement from "./Pages/advertisement-create-page"
import ConversationPage from "./Pages/conversation-page"
import { useContext, useEffect } from "react"
import ConversationEmpty from "./conversation/conversation-empty"
import ConversationContent from "./conversation/conversation"
import Profile from "./Pages/profile-page"
import ProfileInfoSettings from "./profile/profile-info-settings"
import PasswordInfoSettings from "./profile/profile-password-settings"
import MyAdvertisements from "./profile/profile-myadvertisements"
import WebScrapping from "./profile/profile-web-scrapping"
import { AuthContext } from "./context/auth-context"
import { useMediaQuery } from "@mantine/hooks"

function App() {

  const { currentUser } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width: 989px)");
  const urls = ["/chat", "/profile"];

  const ConditionalNavBar = () => {
    const location = useLocation().pathname;
    return urls.some((url) => location.startsWith(url)) ? null : <NavBar />;
  }
  const ConditionalFooter = () => {
    const location = useLocation().pathname;
    return urls.some((url) => location.startsWith(url)) ? null : <Footer />;
  }

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => window.scrollTo(0, 0), [pathname]);
    return null;
  }

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/auth" />
  }

  const RequireNoAuth = ({ children }) => {
    return currentUser ? <Navigate to="/" /> : children
  }

  return (
    <>
      <Router>
        <ConditionalNavBar />
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="auth" element={<RequireNoAuth><Auth /></RequireNoAuth>} />
          <Route path="search/:querys" element={<Search />} />
          <Route path="advertisement/:id" element={<Advertisement />} />
          <Route path="create" element={<RequireAuth><CreateAdvertisement /></RequireAuth>} />
          <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} >
            <Route path="" element={isMobile ? <></> : <Navigate to="/profile/change-profile-info" />} />
            <Route path="change-profile-info" element={<ProfileInfoSettings />} />
            <Route path="change-password" element={<PasswordInfoSettings />} />
            <Route path="my-advertisements" element={<MyAdvertisements />} />
            <Route path="web-scrapping" element={<WebScrapping />} />
          </Route>
          <Route path="chat" element={<RequireAuth><ConversationPage /></RequireAuth>} >
            <Route path="" element={<ConversationEmpty />} />
            <Route path=":id" element={<ConversationContent />} />
          </Route>
          <Route path={"*"} element={<NotFound404 />} />

        </Routes>

        <ConditionalFooter />

      </Router>
    </>
  )
}

export default App
