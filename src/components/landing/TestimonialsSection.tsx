import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 't-1',
      author: 'Claire D’Agostino',
      role: 'Pet Parent to Golden Retriever',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      petAvatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80',
      petName: 'Rusty (3yo)',
      quote:
        'When Rusty suddenly started shivering and wouldn’t eat his dinner on a Sunday evening, PawPal AI immediately guided me through a gum color test and flagged potential toxic ingestion. We got him to the ER clinic before permanent damage occurred. PetCare AI literally saved his life.',
      rating: 5,
      badge: 'Verified Lifesaving Triage',
    },
    {
      id: 't-2',
      author: 'Dr. Gregory Sterling, DVM',
      role: 'Chief Medical Officer, Pacific Vet Specialty',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
      petAvatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=150&q=80',
      petName: 'Clinical Endorsement',
      quote:
        'As a veterinary surgeon, the difference between an owner arriving with vague guesswork versus a structured PetCare AI symptom and vitals timeline is night and day. It cuts triage intake time by 40% and provides immaculate historical data.',
      rating: 5,
      badge: 'Board-Certified Specialist',
    },
    {
      id: 't-3',
      author: 'Julian & Maya Thorne',
      role: 'Feline Foster Parents',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      petAvatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80',
      petName: 'Mochi & Simon',
      quote:
        'Managing vaccine schedules, allergy flare-ups, and dietary weights across two indoor cats used to mean messy paper binders and missed booster deadlines. With PetCare AI’s smart reminders, we haven’t lapsed once in 2 years.',
      rating: 5,
      badge: 'Multi-Pet Household',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 text-forest text-xs font-bold uppercase tracking-wider">
            Clinical Trust & Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight">
            Trusted by Over 14,000 Families and Veterinary Teams
          </h2>
          <p className="text-base text-charcoal-muted leading-relaxed">
            Read real accounts of early diagnosis, proactive allergy detection, and seamless clinical coordination.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-white border border-sage-border shadow-soft flex flex-col justify-between card-hover-lift relative"
            >
              <div>
                {/* Header Rating and Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-forest/10" />
                </div>

                <span className="inline-block text-[10px] font-bold text-emerald-brand bg-emerald-50 px-2.5 py-0.5 rounded-full mb-3">
                  {item.badge}
                </span>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Pet Info */}
              <div className="pt-6 mt-6 border-t border-sage flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border border-sage-border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-forest">{item.author}</h4>
                    <p className="text-[11px] text-charcoal-light">{item.role}</p>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={item.petAvatar}
                    alt={item.petName}
                    title={item.petName}
                    className="w-9 h-9 rounded-xl object-cover border-2 border-emerald-brand/40"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
