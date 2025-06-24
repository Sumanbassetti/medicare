import { Link } from "react-router-dom";
import { Separator } from "../components/ui/separator";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-blue-50">
            <img
              src="/appLogo.png"
              alt="Appointment Icon"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none text-gray-900">
              MediCare
            </h1>
            <p className="text-xs text-gray-500">Book your appointment</p>
          </div>
        </Link>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
