import { useEffect, useRef } from 'react';
import { Award, Users, Clock, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { rotateY: 15, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { scale: 0, rotation: -10 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Clock, value: '10+', label: 'Years Experience', color: 'bg-brand-teal' },
    { icon: Award, value: '500+', label: 'Products Sold', color: 'bg-brand-green' },
    { icon: Star, value: '5.0', label: 'Etsy Rating', color: 'bg-yellow-500' },
    { icon: Users, value: '300+', label: 'Happy Customers', color: 'bg-blue-500' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none">
        <span className="font-teko text-[15vw] lg:text-[20vw] font-bold text-brand-dark/5 tracking-wider">
          ABOUT US
        </span>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2
              ref={headingRef}
              className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-4 lg:mb-6"
            >
              About <span className="text-brand-green">Us</span>
            </h2>

            <div ref={contentRef} className="space-y-4 lg:space-y-6">
              <p className="font-opensans text-base lg:text-lg text-brand-dark/70 leading-relaxed">
                We are a team of passionate makers dedicated to bringing you high-quality 
                3D printed products. Using state-of-the-art Bambu Lab printers, we deliver 
                precision-crafted items that meet the highest standards.
              </p>

              <p className="font-opensans text-base lg:text-lg text-brand-dark/70 leading-relaxed">
                Our shop specializes in creating practical, innovative 3D printed containers 
                designed for nicotine pouch users. From keychain-sized holders to full-size 
                dispensers, we take pride in every print we produce.
              </p>

              <p className="font-opensans text-base lg:text-lg text-brand-dark/70 leading-relaxed">
                As an Etsy Star Seller, we maintain the highest standards of quality and 
                customer service. Every order is carefully crafted on our Bambu Lab P1S and 
                P2S printers and inspected before shipping from our workshop in Kent, WA.
              </p>

              <div className="pt-2 lg:pt-4 relative z-10">
                <a
                  href="https://oz3dprint.etsy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-full font-semibold hover:bg-brand-green/90 transition-colors text-sm lg:text-base shadow-md hover:shadow-lg"
                >
                  Visit our Etsy shop
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              ref={imageRef}
              className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
            >
              <img
                src="/images/printer-p1s.jpg"
                alt="Bambu Lab P1S 3D Printer with AMS"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-3 lg:gap-4 mt-8 lg:mt-12"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card bg-brand-bg rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center mb-3 lg:mb-4`}>
                    <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <p className="font-teko text-2xl lg:text-4xl font-bold text-brand-dark">{stat.value}</p>
                  <p className="text-xs lg:text-sm text-brand-dark/60 font-opensans">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
