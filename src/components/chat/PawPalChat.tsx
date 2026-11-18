import React, { useState, useRef, useEffect } from 'react';
import { Pet, ChatMessage, TriageSeverity } from '../../types';
import { sampleChatPresets } from '../../data/mockData';
import {
  Sparkles,
  Send,
  ShieldAlert,
  Bot,
  User,
  CheckCircle2,
  PhoneCall,
  Clock,
  RotateCcw,
  FileDown,
  Trash2,
  Info,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';

interface PawPalChatProps {
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (id: string) => void;
  onEmergencyClick: () => void;
  onBookAppointment: () => void;
}

export const PawPalChat: React.FC<PawPalChatProps> = ({
  pets,
  selectedPetId,
  onSelectPet,
  onEmergencyClick,
  onBookAppointment,
}) => {
  const activePet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! I'm **PawPal AI**, your dedicated veterinary health companion. 🐾\n\nI am currently reviewing **${activePet.name}'s** profile (${activePet.species}, ${activePet.breed}, ${activePet.age}, ${activePet.weight} lbs). How can I assist you with ${activePet.name}'s well-being, symptoms, or diet today?`,
      timestamp: 'Just now',
      petId: activePet.id,
      triageSeverity: 'Routine',
      recommendations: [
        'Ask about sudden behavioral changes or limping',
        'Verify food safety & toxic ingredient checks',
        'Review upcoming immunization milestones',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      petId: activePet.id,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Realistic veterinary AI triage engine
    setTimeout(() => {
      let replyText = '';
      let severity: TriageSeverity = 'Routine';
      let recommendations: string[] = [];
      let isEmergency = false;

      const lower = query.toLowerCase();

      // Check emergency keywords
      if (
        lower.includes('chocolate') ||
        lower.includes('poison') ||
        lower.includes('grape') ||
        lower.includes('xylitol') ||
        lower.includes('toxic')
      ) {
        severity = 'Urgent';
        replyText = `⚠️ **Urgent Veterinary Advisory: Potential Toxin Ingestion**\n\nFor **${activePet.name}** (${activePet.weight} lbs, ${activePet.breed}), toxic response depends heavily on exact dose relative to body mass.\n\n**Immediate Clinical Triage:**\n1. **Determine exact quantity & timing:** Keep packaging or wrappers immediately.\n2. **Do NOT induce vomiting with hydrogen peroxide** unless explicitly instructed by a licensed veterinarian.\n3. **Assess current status:** Check gum color (should be pink and moist) and heart rhythm.\n\n🚨 **Next Step:** Call the ASPCA Animal Poison Control Center: **(888) 426-4435** or proceed to your nearest 24/7 veterinary trauma center.`;
        recommendations = [
          'Call ASPCA Poison Control hotline immediately',
          'Keep the ingredient label for clinical toxicology review',
          'Do not feed food or water until veterinarian approves',
        ];
        isEmergency = true;
      } else if (
        lower.includes('limp') ||
        lower.includes('leg') ||
        lower.includes('walk') ||
        lower.includes('hurt') ||
        lower.includes('stiff')
      ) {
        severity = 'Monitor';
        replyText = `🩺 **PawPal Clinical Triage: Musculoskeletal & Mobility Review**\n\nFront or hind limb lameness in a ${activePet.breed} is frequently associated with paw pad foreign bodies, soft tissue strain from exercise, or joint inflammation.\n\n**Step-by-Step Home Exam for ${activePet.name}:**\n• **Paw Pad Inspection:** Check between toe webbing for foxtails, thorns, or glass splinters.\n• **Nail Check:** Inspect for split or broken dewclaws.\n• **Palpation:** Gently feel along the leg from toe to shoulder/hip for heat or swelling.\n\n**Management:** Restrict strenuous fetch or stair running for 48 hours. If ${activePet.name} refuses to bear any weight or shows vocal distress, schedule an in-person clinical checkup.`;
        recommendations = [
          'Enforce strict crate or leash rest for 48 hours',
          'Check paws and pads under strong light',
          'Schedule an orthopedic consultation if non-weight bearing',
        ];
      } else if (
        lower.includes('vomit') ||
        lower.includes('diarrhea') ||
        lower.includes('sick') ||
        lower.includes('stomach')
      ) {
        severity = 'Urgent';
        replyText = `🔍 **Gastrointestinal Evaluation Protocol**\n\nAcute GI upset in **${activePet.name}** can stem from dietary indiscretion, infectious gastroenteritis, or ingestion of foreign material.\n\n**Triage Indicators:**\n• **Dehydration Test:** Gently pinch the skin behind the shoulder blades. It should snap back instantly.\n• **Hydration Protocol:** Offer small sips of water or electrolyte solution (1 tbsp every 30 mins) if no vomiting has occurred in the last 2 hours.\n• **Withhold Rich Foods:** Transition to a bland diet (boiled white meat chicken and white rice) once vomiting stops for 12 hours.`;
        recommendations = [
          'Monitor frequency of episodes over next 4 hours',
          'Test gum hydration and skin elasticity',
          'Book vet appointment if vomiting repeats > 2 times',
        ];
      } else if (
        lower.includes('vaccine') ||
        lower.includes('shot') ||
        lower.includes('booster')
      ) {
        severity = 'Routine';
        replyText = `💉 **Immunization Status Review for ${activePet.name}**\n\nAccording to clinical records on file:\n• **Rabies:** Up to date.\n• **Core Vaccines:** Checked and scheduled with Dr. Marcus Vance.\n\nRoutine boosters maintain titer defense without overloading the immune system. You can view all batch numbers and certificates directly in your Health Vault.`;
        recommendations = [
          'View immunization certificates in Health Records',
          'Set automated calendar reminder 2 weeks prior',
        ];
      } else {
        severity = 'Routine';
        replyText = `🐾 **PawPal Clinical Insight for ${activePet.name}**\n\nThank you for checking on ${activePet.name}'s well-being. Based on our clinical database for ${activePet.species}s (${activePet.breed}, age ${activePet.age}):\n\n• **Biometrics:** ${activePet.name}'s recorded vitals are resting at **${activePet.vitals.heartRate} bpm** (normal) and **${activePet.vitals.temperature}°F**.\n• **Dietary note:** Keep monitoring ${activePet.name}'s target weight of ${activePet.targetWeight} lbs.\n\nIf you notice persistent changes in appetite, hydration, or disposition, please book a follow-up consultation with your veterinary care team.`;
        recommendations = [
          'Log daily vitals and activity logs',
          'Maintain fresh water availability',
          'Schedule routine bi-annual wellness exam',
        ];
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        petId: activePet.id,
        triageSeverity: severity,
        recommendations,
        isEmergencyAlert: isEmergency,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Conversation reset. I am ready to evaluate **${activePet.name}** (${activePet.breed}). What would you like to discuss?`,
        timestamp: 'Just now',
        petId: activePet.id,
        triageSeverity: 'Routine',
      },
    ]);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Top Header & Context Bar */}
      <div className="bg-white p-5 rounded-3xl border border-sage-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-forest to-emerald-brand flex items-center justify-center text-white shadow-soft">
              <Sparkles className="w-6 h-6 text-emerald-light" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-brand border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-forest">PawPal AI</h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-brand border border-emerald-200">
                Active Veterinary Agent
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Clinical triaging & proactive pet-care intelligence
            </p>
          </div>
        </div>

        {/* Pet Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-ivory px-3 py-1.5 rounded-2xl border border-sage-border">
            <span className="text-xs font-semibold text-charcoal-light">Triage Subject:</span>
            <select
              value={selectedPetId}
              onChange={(e) => onSelectPet(e.target.value)}
              className="bg-transparent text-xs font-bold text-forest focus:outline-none cursor-pointer"
            >
              {pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.breed})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 text-charcoal-light hover:text-charcoal rounded-xl hover:bg-sage transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Emergency Warning Styling Alert */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <span className="text-xs font-bold text-rose-900 block">
              Emergency Safety Protocol
            </span>
            <p className="text-[11px] text-rose-700">
              For toxic ingestion, severe bleeding, or unconsciousness, contact poison control immediately.
            </p>
          </div>
        </div>

        <button
          onClick={onEmergencyClick}
          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>(888) 426-4435</span>
        </button>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="bg-white rounded-3xl border border-sage-border shadow-soft flex flex-col min-h-[520px] max-h-[700px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-6 space-y-5 overflow-y-auto bg-ivory/30">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-emerald-brand" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 sm:p-5 rounded-3xl space-y-2.5 transition-all ${
                    isUser
                      ? 'bg-forest text-white rounded-tr-none shadow-soft text-xs sm:text-sm font-medium'
                      : 'bg-white text-charcoal border border-sage-border rounded-tl-none shadow-soft'
                  }`}
                >
                  {/* Severity Badge for Assistant */}
                  {!isUser && msg.triageSeverity && (
                    <div className="flex items-center justify-between pb-2 border-b border-sage">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                            msg.triageSeverity === 'Emergency' || msg.triageSeverity === 'Urgent'
                              ? 'bg-rose-100 text-rose-800'
                              : msg.triageSeverity === 'Monitor'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          Triage: {msg.triageSeverity}
                        </span>
                        <span className="text-[11px] text-charcoal-light font-medium">
                          Evaluated for {activePet.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-charcoal-light">{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                    {msg.text}
                  </div>

                  {/* Action Checklist Recommendations */}
                  {!isUser && msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="pt-3 mt-3 border-t border-sage space-y-1.5">
                      <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">
                        Actionable Clinical Steps:
                      </span>
                      {msg.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-charcoal-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Book Button for Urgent cases */}
                  {!isUser && (msg.triageSeverity === 'Urgent' || msg.triageSeverity === 'Monitor') && (
                    <div className="pt-2">
                      <button
                        onClick={onBookAppointment}
                        className="w-full py-2 px-3 rounded-xl bg-forest hover:bg-forest-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                      >
                        Schedule Veterinary Examination for {activePet.name}
                      </button>
                    </div>
                  )}

                  {isUser && (
                    <div className="text-right text-[10px] text-white/60 pt-1">
                      {msg.timestamp}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-emerald-brand flex items-center justify-center text-white shrink-0 mt-0.5">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-brand animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-white border border-sage-border shadow-xs flex items-center gap-2">
                <span className="text-xs font-bold text-forest">PawPal AI is analyzing clinical data</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Question Chips */}
        <div className="p-3 bg-white border-t border-sage flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold uppercase text-charcoal-light shrink-0">
            Suggested Queries:
          </span>
          {sampleChatPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(preset.prompt)}
              className="text-xs font-medium px-3 py-1.5 rounded-xl bg-sage/60 hover:bg-sage text-forest shrink-0 transition-colors border border-sage-border flex items-center gap-1.5"
            >
              <span className="truncate max-w-[200px]">{preset.prompt}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-sage flex items-center gap-3">
          <input
            type="text"
            placeholder={`Ask PawPal AI anything regarding ${activePet.name}'s symptoms, medication, or diet...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-4 py-3 rounded-2xl border border-sage-border text-xs sm:text-sm text-charcoal placeholder-charcoal-light focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 focus:border-emerald-brand bg-ivory/50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim()}
            className="p-3.5 rounded-2xl bg-forest hover:bg-forest-800 disabled:opacity-40 text-white font-bold transition-all btn-primary-glow shrink-0"
          >
            <Send className="w-4 h-4 text-emerald-light" />
          </button>
        </div>
      </div>
    </div>
  );
};
