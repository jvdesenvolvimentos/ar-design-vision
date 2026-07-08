
import { Camera } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    produto: [
      { name: "Recursos", href: "#" },
      { name: "Preços", href: "#" },
      { name: "Demonstração", href: "#" },
      { name: "API", href: "#" }
    ],
    empresa: [
      { name: "Sobre", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Carreiras", href: "#" },
      { name: "Contato", href: "#" }
    ],
    suporte: [
      { name: "Central de Ajuda", href: "#" },
      { name: "Tutoriais", href: "#" },
      { name: "Comunidade", href: "#" },
      { name: "Status", href: "#" }
    ],
    legal: [
      { name: "Privacidade", href: "#" },
      { name: "Termos", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Licenças", href: "#" }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-ar-gradient rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MobiliAR</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Revolucionando o design de móveis com realidade aumentada. 
              Visualize, personalize e aprove projetos em tempo real.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              {footerLinks.produto.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 MobiliAR. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 mt-4 sm:mt-0">
            Mobili AR – Inovação e Design em Cada Detalhe!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
