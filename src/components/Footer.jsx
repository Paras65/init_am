import './Footer.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="footer-main">
       
       
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Init Free Offers Hub &nbsp;|&nbsp;
          <Link to="/privacy">Privacy Policy</Link> &nbsp;|&nbsp;
          <a href="mailto:support@initfreeoffers.com">Contact</a>
        </p>
        <p className="footer-powered">
          Powered by <a href="https://init.init65.co.in/" target="_blank" rel="noopener noreferrer">Init_AM</a>
        </p>
      </div>
    </footer>
  )
}
export default Footer