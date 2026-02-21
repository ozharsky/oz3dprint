import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-3"
            >
              <img 
                src="/logo.svg" 
                alt="OZ3DPrint" 
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-10 w-auto' : 'h-12 w-auto'
                }`}
              />
              <span className={`font-teko font-bold transition-colors duration-300 ${
                isScrolled ? 'text-2xl text-brand-dark' : 'text-3xl text-brand-dark'
              }`}>
                OZ<span className="text-brand-green">3D</span>Print
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-opensans text-sm font-medium text-brand-dark hover:text-brand-green transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://oz3dprint.etsy.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-opensans font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-glow">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-brand-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.svg" alt="OZ3DPrint" className="h-12 w-auto" />
            <span className="font-teko text-3xl font-bold text-brand-dark">
              OZ<span className="text-brand-green">3D</span>Print
            </span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-teko text-3xl font-semibold text-brand-dark hover:text-brand-green transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://oz3dprint.etsy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            <Button className="bg-brand-green hover:bg-brand-green/90 text-white font-opensans font-semibold px-8 py-3 rounded-full">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
