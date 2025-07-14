import React, { useState } from 'react';

// Gallery images data
const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1571266028243-e4b94a9e1e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Summer Festival 2023",
    category: "festival"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Club Resonance",
    category: "club"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Beach Party",
    category: "party"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Warehouse Rave",
    category: "club"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1574879948818-1cfda7aa5b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Private Event",
    category: "private"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Festival Mainstage",
    category: "festival"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Outdoor Concert",
    category: "festival"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Live Performance",
    category: "club"
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Wedding Reception",
    category: "private"
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Rooftop Party",
    category: "party"
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Corporate Event",
    category: "private"
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1576060974974-933c07722c9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Night Club",
    category: "club"
  }
];

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const openModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const getNextImage = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  const getPrevImage = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <div className="bg-black text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Event Gallery</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore the highlights from my performances at various venues and events around the world.
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('festival')}
            className={`px-6 py-2 rounded-full ${filter === 'festival' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Festivals
          </button>
          <button 
            onClick={() => setFilter('club')}
            className={`px-6 py-2 rounded-full ${filter === 'club' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Clubs
          </button>
          <button 
            onClick={() => setFilter('private')}
            className={`px-6 py-2 rounded-full ${filter === 'private' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Private Events
          </button>
          <button 
            onClick={() => setFilter('party')}
            className={`px-6 py-2 rounded-full ${filter === 'party' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Parties
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden group cursor-pointer rounded-lg"
              onClick={() => openModal(image.id)}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={closeModal}
          >
            &times;
          </button>
          
          <button 
            className="absolute left-4 text-white text-4xl"
            onClick={getPrevImage}
          >
            &#8249;
          </button>
          
          <button 
            className="absolute right-4 text-white text-4xl"
            onClick={getNextImage}
          >
            &#8250;
          </button>
          
          <div className="max-w-4xl max-h-[80vh]">
            {selectedImage !== null && (
              <>
                <img 
                  src={galleryImages.find(img => img.id === selectedImage)?.url} 
                  alt={galleryImages.find(img => img.id === selectedImage)?.title} 
                  className="max-h-[70vh] max-w-full object-contain"
                />
                <div className="text-white text-center mt-4">
                  <h3 className="text-2xl font-bold">
                    {galleryImages.find(img => img.id === selectedImage)?.title}
                  </h3>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;