import { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: 'What materials are your products made from?',
      answer: 'All our products are 3D printed using premium PETG filament, which is more durable and heat-resistant than standard PLA. PETG won\'t warp in hot cars and can withstand daily wear and tear.',
    },
    {
      question: 'Will these fit my nicotine pouches?',
      answer: 'Yes! Our cases and containers are designed to fit all standard-size nicotine pouches (like Zyn, Rogue, Velo, etc.). The round cases hold ~20 pouches, and our mini keychains hold 6-8 as backup.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'We ship from Kent, WA via USPS. Most orders arrive within 3-5 business days. You\'ll receive a tracking number as soon as your order ships.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy through Etsy. If you\'re not satisfied with your purchase, contact us via Etsy messages and we\'ll make it right with a replacement or refund.',
    },
    {
      question: 'Do you offer custom colors or bulk orders?',
      answer: 'Yes! We offer 9+ colors for most products. For bulk orders (10+ units), message us on Etsy for custom pricing. Perfect for teams, events, or gifts.',
    },
    {
      question: 'How do I program the NFC case?',
      answer: 'It\'s easy! Download any free NFC app (like NFC Tools), tap your phone to the case, and set your action — reorder link, contact info, focus mode, or anything you want. Works with iPhone and Android.',
    },
    {
      question: 'Are these made in the USA?',
      answer: 'Yes! All products are designed and 3D printed in Kent, Washington. We take pride in American craftsmanship and quality.',
    },
    {
      question: 'How do I clean my case?',
      answer: 'Simply wipe with a damp cloth. PETG is water-resistant and durable. Avoid dishwashers or extreme heat, but daily use and pocket carry are no problem.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="font-teko text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-3 lg:mb-4">
              Frequently <span className="text-brand-green">Asked</span>
              <br />
              Questions
            </h2>
            <p className="font-opensans text-base lg:text-lg text-brand-dark/70 mb-6 lg:mb-8">
              Got questions? We've got answers. If you don't find what you're 
              looking for, feel free to reach out on Etsy.
            </p>
            <a
              href="https://www.etsy.com/messages/new?with_id=77655471&referring_id=57564645&referring_type=shop&recipient_id=77655471"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-green font-semibold hover:underline text-sm lg:text-base"
            >
              Message Us on Etsy
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div ref={itemsRef} className="space-y-3 lg:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-brand-bg rounded-xl lg:rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-4 lg:p-6 text-left"
                >
                  <span className="font-teko text-lg lg:text-xl font-semibold text-brand-dark pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openIndex === index
                        ? 'bg-brand-green text-white rotate-180'
                        : 'bg-brand-dark/10 text-brand-dark'
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 lg:w-5 lg:h-5" />
                    ) : (
                      <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-4 lg:px-6 pb-4 lg:pb-6 font-opensans text-sm lg:text-base text-brand-dark/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
