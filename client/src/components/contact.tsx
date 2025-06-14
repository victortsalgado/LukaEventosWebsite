import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin, MessageCircle, Send, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type ContactFormData = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  mensagem: string;
};

export default function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      nome: "",
      empresa: "",
      email: "",
      telefone: "",
      mensagem: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Retornaremos em breve. Obrigado pelo contato!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-light-background text-dark-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-gold">Vamos planejar seu próximo grande evento?</h2>
          <p className="text-xl text-secondary-text max-w-3xl mx-auto">
            Pronto para criar um evento inesquecível? Entre em contato conosco e vamos
            transformar sua visão em realidade.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div
            ref={infoRef}
            className={`transition-all duration-1000 ${
              infoVisible ? "animate-on-scroll visible" : "animate-on-scroll"
            }`}
          >
            <h3 className="text-3xl font-bold mb-8">Vamos Conversar</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Telefone</h4>
                  <p className="text-gray-300">
                    (91) 9 8155-3464
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Email</h4>
                  <p className="text-gray-300">
                    contato@lukaeventos.com.br
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Horário de Funcionamento</h4>
                  <p className="text-gray-300">
                    Segunda à Sexta: 8h às 18h
                    <br />
                    Sábado: 9h às 14h
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h4 className="text-xl font-semibold mb-6">Siga-nos nas Redes Sociais</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/lukaevento/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors duration-300"
                >
                  <Instagram className="text-white" size={20} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61553048040229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors duration-300"
                >
                  <Facebook className="text-white" size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/97838556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors duration-300"
                >
                  <Linkedin className="text-white" size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className={`transition-all duration-1000 ${
              formVisible ? "animate-on-scroll visible" : "animate-on-scroll"
            }`}
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-bold text-dark-gray mb-8">
                Solicite seu Orçamento
              </h3>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="nome" className="text-sm font-semibold text-dark-gray">
                    Nome *
                  </Label>
                  <Input
                    id="nome"
                    {...form.register("nome")}
                    placeholder="Seu nome completo"
                    className="mt-2 text-dark-gray placeholder:text-gray-400 bg-white border-gray-300 focus:ring-primary-orange focus:border-primary-orange"
                  />
                  {form.formState.errors.nome && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.nome.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="empresa" className="text-sm font-semibold text-dark-gray">
                    Empresa *
                  </Label>
                  <Input
                    id="empresa"
                    {...form.register("empresa")}
                    placeholder="Nome da sua empresa"
                    className="mt-2 text-dark-gray placeholder:text-gray-400 bg-white border-gray-300 focus:ring-primary-orange focus:border-primary-orange"
                  />
                  {form.formState.errors.empresa && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.empresa.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-dark-gray">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="seu@email.com"
                    className="mt-2 text-dark-gray placeholder:text-gray-400 bg-white border-gray-300 focus:ring-primary-orange focus:border-primary-orange"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="telefone" className="text-sm font-semibold text-dark-gray">
                    Telefone *
                  </Label>
                  <Input
                    id="telefone"
                    type="tel"
                    {...form.register("telefone")}
                    placeholder="(11) 99999-9999"
                    className="mt-2 text-dark-gray placeholder:text-gray-400 bg-white border-gray-300 focus:ring-primary-orange focus:border-primary-orange"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 11) {
                        if (value.length > 6) {
                          value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                        } else if (value.length > 2) {
                          value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                        }
                        e.target.value = value;
                        form.setValue("telefone", value);
                      }
                    }}
                  />
                  {form.formState.errors.telefone && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.telefone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="mensagem" className="text-sm font-semibold text-dark-gray">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="mensagem"
                    {...form.register("mensagem")}
                    rows={5}
                    placeholder="Conte-nos sobre seu evento. Que tipo de evento você está planejando? Qual é a data prevista? Quantos convidados você espera?"
                    className="mt-2 text-dark-gray placeholder:text-gray-400 bg-white border-gray-300 focus:ring-primary-orange focus:border-primary-orange resize-none"
                  />
                  {form.formState.errors.mensagem && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.mensagem.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary-orange text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  {contactMutation.isPending ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Enviar Solicitação
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <Shield className="mr-1 text-primary-orange" size={16} />
                  Seus dados estão seguros conosco. Responderemos em até 2 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
