import { useEffect, useRef } from 'react';
import { ArrowRight, Instagram, Facebook, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { x: 100, opacity: 0, clipPath: 'inset(0 100% 0 0)' });
      gsap.set(headingRef.current, { y: 50, opacity: 0 });
      gsap.set(subheadingRef.current, { y: 30, opacity: 0 });
      gsap.set(ctaRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(badgeRef.current, { y: -20, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageRef.current, {
        x: 0,
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'expo.out',
      })
        .to(badgeRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.6')
        .to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4')
        .to(subheadingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.4')
        .to(ctaRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current && headingRef.current) {
        const scrollY = window.scrollY;
        gsap.to(imageRef.current, {
          y: scrollY * 0.15,
          duration: 0.3,
          ease: 'none',
        });
        gsap.to(headingRef.current, {
          y: scrollY * -0.1,
          duration: 0.3,
          ease: 'none',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-brand-bg"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative w-full min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative z-10 order-2 lg:order-1">
              <div ref={badgeRef} className="mb-4 lg:mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-semibold">
                  <Star className="w-4 h-4 fill-brand-green" />
                  Etsy Star Seller
                </span>
              </div>

              <h1
                ref={headingRef}
                className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark leading-tight mb-4 lg:mb-6"
              >
                PREMIUM{' '}
                <span className="text-brand-green">3D PRINTED</span>
                <br />
                CONTAINERS
              </h1>

              <p
                ref={subheadingRef}
                className="font-opensans text-base lg:text-lg text-brand-dark/70 max-w-xl mb-6 lg:mb-8 leading-relaxed"
              >
                Custom-designed nicotine pouch containers crafted with precision 3D printing. 
                Durable, stylish, and made to fit your lifestyle. Based in Kent, WA.
              </p>

              <div ref={ctaRef} className="flex flex-wrap gap-3 lg:gap-4">
                <a href="https://oz3dprint.etsy.com" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-opensans font-semibold px-6 lg:px-8 py-5 lg:py-6 rounded-full text-base lg:text-lg transition-all duration-300 hover:shadow-glow-lg group">
                    Shop Now
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="#portfolio">
                  <Button
                    variant="outline"
                    className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-opensans font-semibold px-6 lg:px-8 py-5 lg:py-6 rounded-full text-base lg:text-lg transition-all duration-300"
                  >
                    View Products
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-4 mt-6 lg:mt-10">
                <span className="text-sm text-brand-dark/50 font-opensans">Follow us:</span>
                <a
                  href="https://instagram.com/oz3d_print"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-green hover:text-white transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com/profile.php?id=61587642182204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-green hover:text-white transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div
                ref={imageRef}
                className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/images/hero-products.webp"
                  alt="3D Printed Container Collection"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 lg:p-6 animate-float">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-brand-green/10 flex items-center justify-center">
                    <Star className="w-5 h-5 lg:w-7 lg:h-7 text-brand-green fill-brand-green" />
                  </div>
                  <div>
                    <p className="font-teko text-2xl lg:text-3xl font-bold text-brand-dark">5.0</p>
                    <p className="text-xs lg:text-sm text-brand-dark/60 font-opensans">Etsy Rating</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-2 lg:-top-4 -right-2 lg:-right-4 bg-brand-dark rounded-xl lg:rounded-2xl shadow-xl p-4 lg:p-6 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-brand-green/20 flex items-center justify-center">
                    <span className="font-teko text-xl lg:text-2xl font-bold text-brand-green">500+</span>
                  </div>
                  <div>
                    <p className="font-teko text-lg lg:text-xl font-bold text-white">Products</p>
                    <p className="text-xs lg:text-sm text-white/60 font-opensans">Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
