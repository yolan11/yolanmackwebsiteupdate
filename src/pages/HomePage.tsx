import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ArrowRight, Disc, Music, Headphones, Speaker } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const eventImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1571266028243-e4b94a9e1e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Summer Festival 2023"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Club Resonance"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Beach Party"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Warehouse Rave"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1574879948818-1cfda7aa5b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Private Event"
  }
];

const brands = [
  {
    id: 1,
    name: "Pioneer DJ",
    logo: <Disc size={48} />,
    description: "Industry standard equipment for professional DJs"
  },
  {
    id: 2,
    name: "Sennheiser",
    logo: <Headphones size={48} />,
    description: "Premium audio equipment for the best sound quality"
  },
  {
    id: 3,
    name: "JBL",
    logo: <Speaker size={48} />,
    description: "Professional sound systems for events of all sizes"
  },
  {
    id: 4,
    name: "Serato",
    logo: <Music size={48} />,
    description: "Professional DJ software for seamless mixing"
  }
];

const HomePage: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="h-screen relative">
        <Slider {...sliderSettings} className="h-full">
          {eventImages.map((image) => (
            <Link to="/gallery" key={image.id} className="outline-none">
              <div 
                className="h-screen bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 text-white text-center px-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{image.title}</h2>
                  <p className="text-xl md:text-2xl mb-8">Click to see more in the gallery</p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <img 
                src="https://hfbcsivzjtspmoxhjjhj.supabase.co/storage/v1/object/public/website_images//DSC05037-_5_-_1_.webp" 
                alt="Yolan Mack DJ" 
                className="rounded-lg shadow-xl w-8/12 h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">About Yolan Mack</h2>
              <p className="text-lg mb-6">
                With over a decade of experience, I've been bringing unforgettable musical experiences to clubs, festivals, and private events around the world. My unique style blends electronic, house, and techno with unexpected elements that keep the dance floor moving.
              </p>
              <p className="text-lg mb-8">
                Based in Paris but available for worldwide bookings, I pride myself on reading the crowd and creating the perfect atmosphere for any event. From intimate gatherings to major festivals, I bring technical precision and creative flair to every set.
              </p>
              <Link 
                to="/booking" 
                className="inline-flex items-center bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Book Me For Your Event
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Brands I Work With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-gray-100 p-8 rounded-lg text-center hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-4 text-black">
                  {brand.logo}
                </div>
                <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                <p>{brand.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Unforgettable Moments?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Whether you're planning a wedding, corporate event, or festival, I'll bring the perfect soundtrack to make your event memorable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/gallery" 
              className="bg-white text-black py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              View Gallery
            </Link>
            <Link 
              to="/booking" 
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-black transition duration-300"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;