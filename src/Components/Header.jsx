import React,{useState} from 'react'
import "./Header.css"
import { Link } from "react-router-dom";
const Header = () => {
 const [menuOpen, setMenuOpen] = useState(false);
 
   return (
     <header className="header">
       <h1 className="title">Welcome to Job Portal</h1>
       <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
         ☰
       </button>
       <nav className={`nav ${menuOpen ? "open" : ""}`}>
         <ul className="nav-links" style={{flexDirection:menuOpen?"column":undefined}}>
         <li><Link to="/">Home</Link></li>
         <li><Link to="/submit">Submit a Job</Link></li>
           <li><Link to="/postings">Postings</Link></li>
           {/* <li><Link to="/apply">Apply for Jobs</Link></li> */}
         </ul>
       </nav>
     </header>
   );
}

export default Header