import { useEffect, useRef } from 'react';
import { Gem, Zap, DollarSign, HeadphonesIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const features = featuresRef.current?.querySelectorAll('.feature-item');
      if (features) {
        gsap.fromTo(
          features,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Gem,
      title: 'Premium Quality',
      description: 'Printed on Bambu Lab P1S & P2S printers with high-quality PETG and PLA filaments for durability.',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Most orders are printed and shipped within 2-3 business days. Quick production with professional results.',
    },
    {
      icon: DollarSign,
      title: 'Great Value',
      description: 'Affordable prices without compromising on quality. Free mini gift included with every order!',
    },
    {
      icon: HeadphonesIcon,
      title: 'Excellent Service',
      description: 'Friendly customer support and accurate product descriptions. We stand behind every item we sell.',
    },
  ];

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-gray-900"
            >
              <img
                src="/images/printer-p2s.jpg"
                alt="Bambu Lab P2S 3D Printer"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            <div className="absolute -top-4 lg:-top-6 -left-4 lg:-left-6 w-16 h-16 lg:w-24 lg:h-24 border-4 border-brand-green rounded-xl lg:rounded-2xl opacity-30" />
            <div className="absolute -bottom-4 lg:-bottom-6 -right-4 lg:-right-6 w-20 h-20 lg:w-32 lg:h-32 bg-brand-green/10 rounded-full" />
            
            <div className="absolute top-4 lg:top-6 right-4 lg:right-6 bg-white/90 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full shadow-lg">
              <span className="font-opensans text-xs lg:text-sm font-bold text-brand-dark">Bambu Lab P2S</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-3 lg:mb-4">
              Why <span className="text-brand-green">Choose Us</span>
            </h2>
            <p className="font-opensans text-base lg:text-lg text-brand-dark/70 mb-6 lg:mb-10">
              We stand out from the competition with our commitment to quality, 
              speed, and customer satisfaction.
            </p>

            <div ref={featuresRef} className="space-y-3 lg:space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl lg:rounded-2xl hover:bg-brand-bg transition-colors duration-300"
                >
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 lg:w-7 lg:h-7 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-teko text-lg lg:text-xl font-bold text-brand-dark mb-0.5 lg:mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-opensans text-sm text-brand-dark/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
