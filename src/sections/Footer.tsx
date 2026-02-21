import { Instagram, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-brand-dark text-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <a href="#hero" className="inline-flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-white rounded-lg p-1.5 flex items-center justify-center">
                <img src="/logo.svg" alt="OZ3DPrint" className="h-full w-full object-contain" />
              </div>
              <span className="font-teko text-3xl font-bold">
                OZ<span className="text-brand-green">3D</span>Print
              </span>
            </a>
            <p className="text-white/60 font-opensans text-sm leading-relaxed mb-6">
              Premium 3D printed nicotine pouch accessories. Made in USA from 
              durable PETG. Quality craftsmanship from our workshop in Kent, WA.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/oz3d_print"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/profile.php?id=61587642182204"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-green transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-teko text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#portfolio'); }}
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-teko text-xl font-bold mb-6">Products</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://oz3dprint.etsy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  Pouch Cases
                </a>
              </li>
              <li>
                <a
                  href="https://oz3dprint.etsy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  Keychains
                </a>
              </li>
              <li>
                <a
                  href="https://oz3dprint.etsy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  Dispensers
                </a>
              </li>
              <li>
                <a
                  href="https://oz3dprint.etsy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-brand-green transition-colors text-sm"
                >
                  NFC Cases
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-teko text-xl font-bold mb-6">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="ml-embedded" data-form="d0ocMC"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm flex items-center gap-1">
              © {currentYear} OZ3DPrint. Made with{' '}
              <Heart className="w-4 h-4 text-brand-green fill-brand-green" /> in Kent, WA
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
