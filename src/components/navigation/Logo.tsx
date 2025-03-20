import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Technikaz" 
        className="h-14 w-auto sm:h-13 hover:opacity-80 transition-opacity"
      />
    </Link>
  );
}