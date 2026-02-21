import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: 'Brian',
      location: 'Verified Buyer',
      rating: 5,
      text: 'Great item. It feels durable. Accurate description. Should be great in my pocket.',
      avatar: 'B',
      date: 'Feb 2026',
    },
    {
      name: 'Todd',
      location: 'Verified Buyer',
      rating: 5,
      text: 'Thanks! Great item. Even included a free gift. Great seller! I plan to buy more! CAME REALLY FAST!',
      avatar: 'T',
      date: 'Feb 2026',
    },
    {
      name: 'Thomas DeWitt',
      location: 'Verified Buyer',
      rating: 5,
      text: 'Great item, high quality, easy to use.',
      avatar: 'T',
      date: 'Feb 2026',
    },
    {
      name: 'Rachel',
      location: 'Verified Buyer',
      rating: 5,
      text: 'Great little keychain, exactly as described. Great quality and easy to open.',
      avatar: 'R',
      date: 'Jan 2026',
    },
    {
      name: 'Kristen',
      location: 'Verified Buyer',
      rating: 5,
      text: 'As described and met all my expectations. Love it and recommend it!',
      avatar: 'K',
      date: 'Dec 2025',
    },
    {
      name: 'Luke',
      location: 'Verified Buyer',
      rating: 5,
      text: 'Its a dip can and it looks just like the picture. They sent a free mini one too. I bought it for hunting hoping it would be quieter than snapping open my pouches. Still giving it all the stars!',
      avatar: 'L',
      date: 'Dec 2025',
    },
    {
      name: 'Jane',
      location: 'Verified Buyer',
      rating: 5,
      text: 'Great stocking stuffer for someone who dips. Much more solid than I expected!',
      avatar: 'J',
      date: 'Nov 2025',
    },
    {
      name: 'Joseph',
      location: 'Verified Buyer',
      rating: 5,
      text: 'Very good product. I really enjoy it. High quality printing and durable.',
      avatar: 'J',
      date: 'Sep 2025',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-brand-bg overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-3 lg:mb-4">
            What Our <span className="text-brand-green">Customers Say</span>
          </h2>
          <p className="font-opensans text-base lg:text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Real reviews from real customers. See why people love our 3D printed containers.
          </p>
        </div>

        <div ref={carouselRef} className="relative max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl lg:rounded-3xl shadow-xl p-6 lg:p-12">
            <div className="absolute -top-4 lg:-top-6 left-6 lg:left-8 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-brand-green flex items-center justify-center">
              <Quote className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>

            <div className="absolute top-4 lg:top-6 right-4 lg:right-8">
              <span className="inline-flex items-center gap-1 px-2 lg:px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Etsy
              </span>
            </div>

            <div className="pt-6 lg:pt-4">
              <div className="flex gap-1 mb-4 lg:mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="font-opensans text-base lg:text-xl text-brand-dark/80 leading-relaxed mb-6 lg:mb-8 min-h-[80px] lg:min-h-[120px]">
                "{testimonials[activeIndex].text}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-brand-green flex items-center justify-center">
                    <span className="font-teko text-lg lg:text-2xl font-bold text-white">
                      {testimonials[activeIndex].avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-teko text-lg lg:text-xl font-bold text-brand-dark">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-xs lg:text-sm text-brand-dark/60">
                      {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
                <p className="text-xs lg:text-sm text-brand-dark/40">
                  {testimonials[activeIndex].date}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 lg:gap-4 mt-6 lg:mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-dark hover:bg-brand-green hover:text-white transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>

            <div className="flex gap-1.5 lg:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 lg:h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-brand-green w-6 lg:w-8'
                      : 'bg-brand-dark/20 hover:bg-brand-dark/40 w-2 lg:w-3'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-brand-dark hover:bg-brand-green hover:text-white transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
