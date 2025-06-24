import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./common/Header";
import { Toaster } from "./components/ui/sonner";
import AppointmentBooking from "./pages/AppointmentBooking";
import AppointmentDetails from "./pages/AppointmentDetails";
import DoctorSelection from "./pages/DoctorSelection";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<DoctorSelection />} />
              <Route
                path="/appointment/:doctorId"
                element={<AppointmentBooking />}
              />
              <Route
                path="/details/:doctorId"
                element={<AppointmentDetails />}
              />
            </Routes>
          </main>
        </div>
        <Toaster richColors position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;
