import { useEffect, useRef } from 'react';
import { MessageSquare, PenTool, Printer, Truck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      const steps = stepsRef.current?.querySelectorAll('.process-step');
      if (steps) {
        steps.forEach((step) => {
          gsap.fromTo(
            step,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: MessageSquare,
      title: 'Order',
      description: 'Place your order through Etsy. Choose your color and style preferences.',
      image: '/images/product-colors.webp',
    },
    {
      icon: PenTool,
      title: 'Prepare',
      description: 'We prepare your design files and load the perfect filament color into our Bambu Lab printers.',
      image: '/images/printer-p1s-white.webp',
    },
    {
      icon: Printer,
      title: 'Print',
      description: 'Your item is precision-printed on our Bambu Lab P1S or P2S printers with high-quality materials.',
      image: '/images/printer-p2s-studio.jpg',
    },
    {
      icon: Truck,
      title: 'Ship',
      description: 'Each order includes a free mini gift! Carefully packaged and shipped fast from Kent, WA.',
      image: '/images/hero-products.webp',
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-brand-bg overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-3 lg:mb-4">
            Our <span className="text-brand-green">Process</span>
          </h2>
          <p className="font-opensans text-base lg:text-lg text-brand-dark/70 max-w-2xl mx-auto">
            From order to delivery, we ensure a smooth process with professional 
            quality at every step.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-1 bg-brand-dark/10 lg:-translate-x-1/2">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 right-0 bg-brand-green origin-top"
              style={{ height: '100%' }}
            />
          </div>

          <div ref={stepsRef} className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`process-step relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                  index !== steps.length - 1 ? 'lg:pb-16' : ''
                }`}
              >
                <div
                  className={`ml-10 lg:ml-0 ${
                    index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className={`flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4 lg:justify-start ${
                        index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                      }`}>
                      <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-brand-green flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                      </div>
                      <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                        <span className="text-xs lg:text-sm text-brand-green font-semibold">
                          Step {index + 1}
                        </span>
                        <h3 className="font-teko text-xl lg:text-2xl font-bold text-brand-dark">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="font-opensans text-sm lg:text-base text-brand-dark/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`hidden lg:block ${
                    index % 2 === 0 ? 'lg:col-start-2 lg:pl-16' : 'lg:col-start-1 lg:pr-16 lg:row-start-1'
                  }`}
                >
                  <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-40 lg:h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="absolute left-4 lg:left-1/2 top-4 lg:top-6 -translate-x-1/2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-brand-green border-2 lg:border-4 border-white shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
