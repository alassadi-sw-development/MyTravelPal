import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import Book from "./pages/Book";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="book" element={<ProtectedRoute><Book /></ProtectedRoute>} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:cityId" element={<City />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
