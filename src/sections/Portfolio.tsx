import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.portfolio-item');
      if (items) {
        items.forEach((item) => {
          const rotation = (Math.random() - 0.5) * 4;
          gsap.fromTo(
            item,
            { scale: 0.8, opacity: 0, rotation: rotation - 5 },
            {
              scale: 1,
              opacity: 1,
              rotation: rotation,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const portfolioItems = [
    { title: 'Seattle 12s Edition', category: 'Sports Themed', image: '/images/product-seattle.webp' },
    { title: 'Round Keychain', category: 'Keychain Series', image: '/images/product-keychain-round.webp' },
    { title: 'Matte Black', category: 'Premium Finish', image: '/images/product-matte-black.webp' },
    { title: 'Outdoor Collection', category: 'Adventure Ready', image: '/images/product-outdoor.webp' },
    { title: 'Workshop Tough', category: 'Heavy Duty', image: '/images/product-workshop.webp' },
    { title: 'Lake Life Set', category: 'Multi-Color', image: '/images/product-lake-life.webp' },
    { title: 'Color Variety', category: 'Keychain Edition', image: '/images/product-colors.webp' },
    { title: 'Gym Bag Essential', category: 'Active Lifestyle', image: '/images/product-gym.webp' },
    { title: 'Lime Green', category: 'Vibrant Colors', image: '/images/product-lime.webp' },
    { title: 'Navy Blue', category: 'Clean Design', image: '/images/product-navy.webp' },
    { title: 'Sleek Dispenser', category: 'Premium Model', image: '/images/product-dispenser.webp' },
    { title: 'Full Collection', category: 'All Styles', image: '/images/hero-products.webp' },
  ];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-3 lg:mb-4">
            Our <span className="text-brand-green">Products</span>
          </h2>
          <p className="font-opensans text-base lg:text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Browse through our collection of 3D printed nicotine pouch containers. 
            Each piece is crafted with precision and attention to detail.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6"
        >
          {portfolioItems.map((item, index) => (
            <a
              key={index}
              href="https://oz3dprint.etsy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-item group relative rounded-xl lg:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer block"
            >
              <div className="relative aspect-square">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-green text-xs lg:text-sm font-semibold mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="font-teko text-lg lg:text-xl font-bold text-white mb-1 lg:mb-2">
                    {item.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-white text-xs lg:text-sm font-semibold hover:text-brand-green transition-colors">
                    View on Etsy
                    <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8 lg:mt-12">
          <a
            href="https://oz3dprint.etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-brand-dark text-white rounded-full font-semibold hover:bg-brand-green transition-colors duration-300 text-sm lg:text-base"
          >
            Shop All Products
            <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
