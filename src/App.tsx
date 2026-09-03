import { useState, useEffect } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import CommandMenu from './components/CommandMenu';
import { playPopSound } from './utils/audio';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Handle Cmd+K global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandMenuOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectService = (serviceName: string) => {
    playPopSound(550, 0.04);
    setSelectedService(serviceName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090d] text-zinc-100 selection:bg-amber-400 selection:text-black">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Ambient Interactive Particle Canvas Background */}
      <InteractiveBackground />

      {/* Navigation Header */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCommand={() => setCommandMenuOpen(true)}
      />

      {/* Main Sections Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Full-Screen Hero */}
        <Hero onOpenResume={() => setResumeModalOpen(true)} />

        {/* About & Narrative */}
        <About />

        {/* Selected Projects */}
        <Projects />

        {/* Experience & Education */}
        <Experience />

        {/* Technical Skills */}
        <Skills />

        {/* Specialized Services */}
        <Services onSelectService={handleSelectService} />

        {/* Contact & Transmission */}
        <Contact initialProjectType={selectedService} />
      </main>

      {/* Closing Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />
    </div>
  );
}
