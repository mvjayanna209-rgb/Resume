import { motion } from 'motion/react';
import { 
  Layers, 
  Server, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Code2
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6 text-sky-400" />;
      case 'Server': return <Server className="w-6 h-6 text-indigo-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-sky-400 mb-3"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>ENGINEERING CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            Specialized Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl"
          >
            Delivering clean architectural solutions across modern web stacks, robust API runtimes, and security workflows.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-md shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Card Top Pill & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-zinc-800/80 border border-white/10 group-hover:border-sky-400/40 group-hover:scale-105 transition-all">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800 text-sky-400 border border-white/5">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-sky-300 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables list */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                    Key Deliverables:
                  </span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">Available for contract & full-time</span>
                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Request Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
