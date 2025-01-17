import React, { useState, useEffect } from 'react';
import { Scroll, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  category: 'witchcraft' | 'occult' | 'supernatural';
  date: string;
  image?: string;
}

export default function OccultNewsFooter() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    // Simulated news data - in a real app, this would come from an API
    const mockNews: NewsItem[] = [
      {
        title: "Ancient Grimoire Discovered in Romanian Monastery",
        description: "Historians uncover a 15th-century book of shadows containing previously unknown magical rituals.",
        url: "#",
        source: "Mystical Chronicles",
        category: "occult",
        date: "2024-01-15",
        image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667"
      },
      {
        title: "New Study Links Moon Phases to Plant Growth",
        description: "Research confirms traditional wisdom about lunar gardening practices.",
        url: "#",
        source: "Witch's Garden",
        category: "witchcraft",
        date: "2024-01-14",
        image: "https://images.unsplash.com/photo-1518715982419-9015401820ce"
      },
      {
        title: "Rare Celestial Alignment Predicted for Spring Equinox",
        description: "Astrologers prepare for unique planetary configuration not seen in centuries.",
        url: "#",
        source: "Cosmic Observer",
        category: "supernatural",
        date: "2024-01-13"
      },
      {
        title: "Traditional Healing Practices Gain Recognition",
        description: "WHO acknowledges the value of indigenous magical healing methods.",
        url: "#",
        source: "Magical Health Today",
        category: "witchcraft",
        date: "2024-01-12"
      },
      {
        title: "Crystal Formations Found with Unique Properties",
        description: "Geologists puzzled by crystals exhibiting unexpected energetic signatures.",
        url: "#",
        source: "Earth Mysteries",
        category: "occult",
        date: "2024-01-11"
      }
    ];

    setNews(mockNews);
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const currentNews = news.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'witchcraft':
        return 'text-green-400';
      case 'occult':
        return 'text-purple-400';
      case 'supernatural':
        return 'text-blue-400';
      default:
        return 'text-halloween-text-secondary';
    }
  };

  return (
    <footer className="bg-halloween-card border-t border-halloween-border mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-halloween-text-primary flex items-center gap-2">
            <Scroll className="h-5 w-5 text-halloween-accent" />
            Mystical News & Updates
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              className="p-1 hover:bg-halloween-background rounded-full transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-halloween-text-secondary" />
            </button>
            <span className="text-sm text-halloween-text-secondary">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="p-1 hover:bg-halloween-background rounded-full transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-halloween-text-secondary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentNews.map((item, index) => (
            <article
              key={index}
              className="bg-halloween-background border border-halloween-border rounded-lg overflow-hidden hover:border-halloween-accent transition-colors"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium capitalize ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-halloween-text-secondary">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-halloween-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-halloween-text-secondary mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-halloween-text-secondary">
                    Source: {item.source}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-halloween-accent hover:text-halloween-accent/80 flex items-center gap-1 text-sm"
                  >
                    Read More
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </footer>
  );
}