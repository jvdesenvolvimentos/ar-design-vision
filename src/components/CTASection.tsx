
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  return (
    <section className="py-20 bg-ar-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-xl rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 border border-white rounded-xl rotate-12"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="space-y-8">
          {/* Icon */}
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto backdrop-blur-sm">
            <Camera className="w-10 h-10 text-white" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Pronto para revolucionar seus projetos?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Junte-se a centenas de profissionais que já usam o MobiliAR para criar 
              experiências únicas para seus clientes.
            </p>
          </div>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-blue-100 focus:bg-white/30 focus:border-white"
              />
              <Button className="bg-white text-ar-blue hover:bg-blue-50 font-semibold px-8">
                Começar Grátis
              </Button>
            </div>
            <p className="text-sm text-blue-100 mt-3">
              Teste grátis por 14 dias. Sem cartão de crédito.
            </p>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">✓</div>
              <p className="text-blue-100 mt-2">Catálogo completo</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">✓</div>
              <p className="text-blue-100 mt-2">AR ilimitada</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">✓</div>
              <p className="text-blue-100 mt-2">Suporte 24h</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
