import React from 'react';
import { veterinarians } from '../../data/mockData';
import { Stethoscope, Star, CheckCircle, Video, MapPin, Calendar, ArrowRight } from 'lucide-react';

interface VetServicesSectionProps {
  onBookVet: (vetId?: string) => void;
}

export const VetServicesSection: React.FC<VetServicesSectionProps> = ({ onBookVet }) => {
  return (
    <section id="services" className="py-20 bg-white border-b border-sage-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 text-forest text-xs font-bold uppercase tracking-wider">
              Accredited Clinical Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight">
              Direct Access to Top 5% Board-Certified Veterinarians
            </h2>
            <p className="text-base text-charcoal-muted leading-relaxed">
              Every veterinarian on PetCare AI holds advanced certifications, board qualifications (DACVIM, DACVS, DACVD), and integrated digital clinic workflows.
            </p>
          </div>

          <button
            onClick={() => onBookVet()}
            className="self-start md:self-auto px-5 py-3 rounded-xl border border-forest text-forest hover:bg-forest hover:text-white font-bold text-sm transition-all flex items-center gap-2"
          >
            <span>View All Specialists</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Veterinarian Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {veterinarians.map((vet) => (
            <div
              key={vet.id}
              className="rounded-3xl bg-ivory/40 border border-sage-border overflow-hidden hover:border-emerald-200 hover:bg-white transition-all duration-300 card-hover-lift flex flex-col justify-between"
            >
              <div>
                {/* Vet Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sage">
                  <img
                    src={vet.avatarUrl}
                    alt={vet.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-forest font-bold text-xs flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{vet.rating}</span>
                    <span className="text-[10px] text-charcoal-light">({vet.reviewCount})</span>
                  </div>

                  {vet.acceptsVirtual && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-forest/80 backdrop-blur text-white text-[10px] font-bold flex items-center gap-1">
                      <Video className="w-3 h-3 text-emerald-light" />
                      <span>Tele-Health Available</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-forest leading-snug">
                      {vet.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      {vet.title}
                    </p>
                  </div>

                  {/* Specializations Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {vet.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sage text-forest"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                    {vet.bio}
                  </p>

                  <div className="pt-2 border-t border-sage text-xs text-charcoal-light flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                    <span className="truncate">{vet.clinic}</span>
                  </div>
                </div>
              </div>

              {/* Action Bottom Bar */}
              <div className="p-4 bg-white border-t border-sage-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-charcoal-light block">Consultation</span>
                  <span className="text-base font-extrabold text-forest">${vet.consultationFee}</span>
                </div>
                <button
                  onClick={() => onBookVet(vet.id)}
                  className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-light" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
