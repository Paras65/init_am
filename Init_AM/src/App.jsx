import { useState, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Notifications from './components/Notifications'
import SearchBar from './components/SearchBar'
import TrendingOffers from './components/TrendingOffers'
import ProductList from './components/ProductList'
import Footer from './components/Footer'
import './components/Notifications.css'
import ProductOpt from './components/ProductOpt';
import VideoProductAd from './components/VideoProductAd';
import FAQ from './components/FAQ';
import About from './components/About';
import ReferAndEarn from './components/ReferAndEarn';
import LiveDeals from './components/LiveDeals';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "info"
  });
  const notificationTimeout = useRef();

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(""); // Reset category filter on new search
    setNotification({
      message: `Showing results for "${query}"`,
      type: "info"
    });
    if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
    notificationTimeout.current = setTimeout(() => setNotification({ message: "", type: "info" }), 3000);
  };

  return (
    <div className="app-container">
      <Header onCategorySelect={setSelectedCategory} />
      <Notifications
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />
      <main>
        <About />
        <ReferAndEarn />
        {/* <LiveDeals /> Add here for real-time coupons/offers */}
        <SearchBar onSearch={handleSearch} />
        <TrendingOffers />
        <VideoProductAd
          videoUrl="https://a.impactradius-go.com/display-ad/7443-701707"
          title="Watch: Our Featured Product"
          description="See this product in action and discover its benefits!"
          ctaUrl="https://appsumo.8odi.net/c/2194403/701707/7443"
        />
        
        {/* <ProductOpt /> */}
        <ProductList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
