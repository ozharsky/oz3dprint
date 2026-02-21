import { useEffect, useRef } from 'react';
import { Printer, Palette, Package, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { rotateX: 90, opacity: 0 },
          {
            rotateX: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Printer,
      title: '3D Printing',
      description: 'High-quality production printing using premium PETG and PLA filaments on Bambu Lab printers.',
      image: '/images/product-colors.webp',
    },
    {
      icon: Palette,
      title: 'Custom Colors',
      description: 'Choose from a wide range of colors to match your style, team colors, or brand identity.',
      image: '/images/product-lake-life.webp',
    },
    {
      icon: Package,
      title: 'Bulk Orders',
      description: 'Need multiple units? We offer competitive pricing for bulk orders with fast turnaround.',
      image: '/images/product-outdoor.webp',
    },
    {
      icon: Sparkles,
      title: 'Custom Designs',
      description: 'Have a specific design in mind? We can create custom containers tailored to your needs.',
      image: '/images/product-seattle.webp',
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-brand-bg overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div ref={headingRef} className="text-center mb-10 lg:mb-16">
          <h2 className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-3 lg:mb-4">
            Our <span className="text-brand-green">Services</span>
          </h2>
          <p className="font-opensans text-base lg:text-lg text-brand-dark/70 max-w-2xl mx-auto">
            From custom colors to bulk orders, we offer comprehensive 3D printing 
            solutions tailored to your specific needs.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-40 lg:h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                
                <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-brand-green flex items-center justify-center shadow-lg">
                  <service.icon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>

              <div className="p-4 lg:p-6">
                <h3 className="font-teko text-xl lg:text-2xl font-bold text-brand-dark mb-1 lg:mb-2 group-hover:text-brand-green transition-colors">
                  {service.title}
                </h3>
                <p className="font-opensans text-sm text-brand-dark/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
