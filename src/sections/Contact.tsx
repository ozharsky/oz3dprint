import { useEffect, useRef } from 'react';
import { MapPin, Mail, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    { icon: MapPin, title: 'Location', content: 'Kent, WA, USA' },
    { icon: Mail, title: 'Contact', content: 'Message us on Etsy' },
    { icon: Clock, title: 'Hours', content: 'Mon - Fri: 9AM - 6PM PST' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-brand-bg overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-3 lg:mb-4">
            Get In <span className="text-brand-green">Touch</span>
          </h2>
          <p className="font-opensans text-base lg:text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out through Etsy for the fastest response.
          </p>
        </div>

        <div
          ref={contentRef}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-brand-dark rounded-2xl lg:rounded-3xl p-6 lg:p-12 text-white text-center">
            <h3 className="font-teko text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
              Contact Us
            </h3>

            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-brand-green/20 flex items-center justify-center">
                    <item.icon className="w-6 h-6 lg:w-7 lg:h-7 text-brand-green" />
                  </div>
                  <p className="text-white/60 text-sm">{item.title}</p>
                  <p className="font-semibold text-sm lg:text-base">{item.content}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.etsy.com/messages/new?with_id=77655471&referring_id=57564645&referring_type=shop&recipient_id=77655471"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-brand-green text-white rounded-full font-semibold hover:bg-brand-green/90 transition-all duration-300 hover:shadow-glow text-base lg:text-lg"
            >
              <Mail className="w-5 h-5" />
              Send Message on Etsy
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm lg:text-base mb-3">
                Ready to order?
              </p>
              <a
                href="https://oz3dprint.etsy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors text-sm lg:text-base"
              >
                Visit Our Etsy Shop
                <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
