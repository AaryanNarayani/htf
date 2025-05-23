/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Upload,
  Shield,
  BarChart3,
  Lightbulb,
  MessageCircle,
  Mail,
  ArrowRight,
  CheckCircle,
  FileText,
  Zap,
  Menu,
  X,
  Dot,
  ArrowUpRight,
  Loader2,
  Heart,
} from "lucide-react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

interface DocumentTypeProps {
  title: string;
  description: string;
}

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const emailSent = localStorage.getItem("email_sent");
  useEffect(() => {
    if (emailSent) {
      setIsSubmitted(true);
    }
  }, [emailSent]);


  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e : any ) => {
    e.preventDefault();
    

    const serviceId = import.meta.env?.VITE_SERVICE_ID;
    const templateId = import.meta.env?.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env?.VITE_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing environment variables");
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setIsLoading(true);
    await emailjs
      .send(serviceId, templateId, {
        user_email: email,
      }, {
        publicKey
      })
      .then(
        () => {
          setIsSubmitted(true);
          localStorage.setItem("email_sent", "true");
          toast.success("Thanks for joining! We'll be in touch soon.");
          setEmail("");
          setIsLoading(false);
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast.error("Something went wrong. Please try again.");
          setIsLoading(false);
        },
      );
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    delay,
  }) => (
    <div
      className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 ${
        isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-cyan-400 mb-6 p-3 bg-cyan-400/10 rounded-xl w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-primary-blue font-secondary">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const DocumentType: React.FC<DocumentTypeProps> = ({
    title,
    description,
  }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50 hover:border-cyan-500/30 transition-colors">
      <FileText className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ffffff, #00d4ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #00d4ff, #0099cc);
        }
        
        .construction-gradient {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full  backdrop-blur-xl border-b border-gray-800/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-cyan-400">LegitAi</span>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection("waitlist")}
                  className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Waitlist
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("features")}
                className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("waitlist")}
                className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              >
                Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="flex items-center gap-2 px-3 py-3 rounded-full pr-4 bg-primary-foreground-orange text-black text-md font-medium font-secondary shadow-lg backdrop-blur-md absolute top-20 left-4 z-999">
          <span className="w-5 h-5 bg-primary-yellow rounded-full animate-pulse flex justify-center items-center" >
            <span className="bg-amber-600 w-2 h-2 rounded-full shadow" />
          </span>
          <span>Under Development</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.1)_0%,transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div
            className={`text-center transition-all duration-1000 flex flex-col items-center ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[150px] font-primary mb-6 tracking-[5px] text-white flex items-center justify-center relative w-fit md:w-full">
              Legit{" "}
              <Dot
                size={300}
                className="absolute right-0 -top-15 text-primary-blue hidden lg:block"
              />
              <Dot
                size={50}
                className="absolute -right-9 -bottom-2 text-primary-blue block lg:hidden"
              />
              Ai
            </h1>

            <div className="max-w-4xl mx-auto mb-8">
              {/* <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
                Your AI Legal Assistant is Under Construction. Get Ready for LegitAi!
              </p>
              <p className="text-lg md:text-xl text-gray-400 mb-2">
                Understand contracts, identify risks, and get AI-powered suggestions in minutes.
              </p> */}
              <p className="text-base md:text-lg text-white font-secondary font-medium">
                It's like having a smart lawyer assistant that reads your{" "}
                <span className="text-primary-blue">legal documents</span> and
                tells you what's wrong with them.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
              <button
                onClick={() => scrollToSection("waitlist")}
                className="bg-[#1A1A1A] backdrop-blur-2xl text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg  transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                Join Waitlist <ArrowUpRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="border border-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300 inline-flex items-center gap-2"
              >
                Learn More <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-b from-transparent to-gray-900/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              What is LegitAi?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              ✨ LegitAi is an AI-powered platform designed to make legal
              document analysis accessible and affordable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={<Upload size={32} />}
              title="Instant Document Analysis"
              description="Upload contracts (PDF, DOCX, TXT) and get insights fast. Our AI processes your documents in seconds."
              delay={100}
            />
            <FeatureCard
              icon={<Shield size={32} />}
              title="Risk Identification"
              description="Detect potentially problematic clauses and understand their severity with our advanced risk analysis."
              delay={200}
            />
            <FeatureCard
              icon={<BarChart3 size={32} />}
              title="Clarity Scoring"
              description="Measure how clear and fair your contract is with our comprehensive scoring system."
              delay={300}
            />
            <FeatureCard
              icon={<Lightbulb size={32} />}
              title="Improvement Suggestions"
              description="Get AI-powered edits and recommendations to strengthen your legal documents."
              delay={400}
            />
            <FeatureCard
              icon={<MessageCircle size={32} />}
              title="Interactive AI Chat"
              description="Coming Soon: Ask questions about your documents with our intelligent chat assistant!"
              delay={500}
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Lightning Fast"
              description="Get comprehensive legal analysis in minutes, not hours or days."
              delay={600}
            />
          </div>

          {/* Document Types */}
          <div className="bg-gray-900/30 rounded-3xl p-8 md:p-12 border border-gray-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary-blue">
              <span className="text-primary-blue">📄</span> Supported Document
              Types
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <DocumentType
                title="Non-Disclosure Agreements (NDAs)"
                description="Protect your confidential information with proper NDA analysis"
              />
              <DocumentType
                title="Employment Agreements / Offer Letters"
                description="Understand your employment terms and conditions"
              />
              <DocumentType
                title="Terms of Service / Privacy Policies"
                description="Navigate complex terms and privacy requirements"
              />
              <DocumentType
                title="Software License Agreements (EULAs)"
                description="Decode software licensing terms and restrictions"
              />
              <DocumentType
                title="Legal Notices & Letters"
                description="Handle cease & desist letters and legal correspondence"
              />
              <DocumentType
                title="And More Coming Soon..."
                description="We're continuously expanding our document support"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-b from-gray-900/20 to-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text font-secondary">
              How LegitAi Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-secondary">
              LegitAi combines document processing + powerful AI (like Gemini
              2.5 Pro) to deliver actionable insights securely and instantly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  1
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    👤 Upload Your Document
                  </h3>
                  <p className="text-gray-400">
                    You upload your document (PDF, DOCX, TXT) securely to our
                    platform
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight
                  className="text-cyan-400 rotate-90 md:rotate-0"
                  size={32}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  2
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    📦 AI Analysis Engine
                  </h3>
                  <p className="text-gray-400">
                    Smart Parsing & Structuring • AI Analysis (Gemini 2.5 Pro) •
                    Risk & Scoring Engine • Secure Vector Database for chat
                    context
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight
                  className="text-cyan-400 rotate-90 md:rotate-0"
                  size={32}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  3
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    💻 Get Clear Results
                  </h3>
                  <p className="text-gray-400">
                    Receive comprehensive insights: Risk Analysis, Clarity
                    Scores, and AI-powered Improvement Suggestions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative  flex items-end w-full">
          {/* add data about achitecture */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12 w-full max-w-7xl mx-auto mb-16 md:flex lg:flex justify-between flex-col items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">System Architecture</h1>
          <p className="text-xl text-gray-400 max-w-xl ">
            Our robust RAG (Retrieval-Augmented Generation) system combines
            modern cloud infrastructure with intelligent processing to deliver
            fast, accurate responses. The architecture features R2 Object Store
            for scalable document storage, a React-based client interface for
            user interactions, Redis caching layer for performance optimization,
            and a specialized vector database for semantic search capabilities.
            The backend server orchestrates API requests and business logic
            while OAuth 2.0 ensures secure authentication through Google's
            infrastructure. Asynchronous processing is handled by Redis queues
            that distribute tasks to workers integrated with large language
            models, creating a comprehensive system that scales efficiently
            while maintaining high availability and contextual accuracy for
            enterprise-grade AI applications.
          </p>
          </div>
          <img
          src="\architecture_white.png"
          alt=""
          className=" aspect-auto w-[500px]"
        />
        </div>
        
      </section>

      <section
        id="waitlist"
        className="py-20 bg-gradient-to-b from-transparent to-gray-900/50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              Be the First to Know!
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Get early access updates join our waitlist and be among the
              first to experience the future of legal document analysis.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w mx-auto" ref={form}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="gradient-bg cursor-pointer text-black px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 w-fit"
                  >
                    {
                      isLoading ? <Loader2 className="animate-spin" size={18} /> : <>
                        <Mail size={18} />
                    Join Waitlist
                      </>
                    }
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 max-w-md mx-auto">
                <CheckCircle
                  className="text-green-400 mx-auto mb-2"
                  size={32}
                />
                <p className="text-green-400 font-semibold">
                  Thanks for joining! We'll be in touch soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl font-bold text-cyan-400">LegitAi</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <div className="text-gray-400 text-center md:text-right">
              <div className="flex gap-2 justify-center md:justify-end mt-2 items-center">
                <span className="text-sm">made with</span>
                <Heart className="text-red-500 fill-current" size={16} />
                <span className="text-sm">by codeSnorters</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
