import React, { useState } from 'react';
import { Pet } from '../../types';
import { Badge } from '../common/Badge';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Syringe,
  FileCheck,
  Stethoscope,
  Pill,
  ShieldCheck,
  Share2,
} from 'lucide-react';

interface HealthRecordsViewProps {
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (id: string) => void;
  onShowToast: (title: string, message?: string) => void;
}

export const HealthRecordsView: React.FC<HealthRecordsViewProps> = ({
  pets,
  selectedPetId,
  onSelectPet,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const activePet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const handleExport = (recordTitle: string) => {
    onShowToast('Record Exported', `"${recordTitle}" encrypted clinical PDF generated successfully.`);
  };

  const handleExportAll = () => {
    onShowToast('Clinical Vault Exported', `Comprehensive health docket for ${activePet.name} downloaded.`);
  };

  // Filter records
  const records = activePet.medicalRecords.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.veterinarian.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || rec.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-sage-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-forest">
              Clinical Health Vault
            </h1>
            <Badge variant="primary" size="sm">
              Encrypted
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Verified veterinary pathology, vaccination logs, and pharmacological records for {activePet.name}.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Pet Switcher */}
          <select
            value={selectedPetId}
            onChange={(e) => onSelectPet(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-sage-border text-xs font-bold text-forest bg-ivory focus:outline-none"
          >
            {pets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.species})
              </option>
            ))}
          </select>

          <button
            onClick={handleExportAll}
            className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-800 text-white text-xs font-bold transition-all btn-primary-glow flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-emerald-light" />
            <span>Export Full Record</span>
          </button>
        </div>
      </div>

      {/* Immunization Certificates Overview Box */}
      <div className="bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-brand flex items-center justify-center">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-forest">
                Immunization Certificates & Batch Verification
              </h2>
              <p className="text-xs text-charcoal-muted">
                Official Rabies & Core vaccine numbers accepted for boarding, travel, and licensing.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {activePet.vaccinations.map((vac) => (
            <div
              key={vac.id}
              className="p-4 rounded-2xl bg-ivory/60 border border-sage-border flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-forest">{vac.name}</h3>
                  <Badge
                    variant={vac.status === 'up-to-date' ? 'success' : 'warning'}
                    size="sm"
                    dot={true}
                  >
                    {vac.status === 'up-to-date' ? 'Verified' : 'Expiring'}
                  </Badge>
                </div>
                <p className="text-[11px] text-charcoal-muted mt-1">
                  Administered: {vac.dateAdministered} • Next: {vac.nextDueDate}
                </p>
                <div className="text-[10px] text-charcoal-light mt-1">
                  Batch: <code className="bg-sage px-1 rounded">{vac.batchNumber}</code>
                </div>
              </div>

              <button
                onClick={() => handleExport(vac.name)}
                className="self-start text-[11px] font-bold text-emerald-brand hover:text-emerald-dark flex items-center gap-1 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Certificate PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-sage-border shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal-light absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search records, medications, doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-sage-border text-xs bg-ivory/40 focus:outline-none focus:ring-1 focus:ring-emerald-brand"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Checkup', 'Prescription', 'Vaccination'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                categoryFilter === cat
                  ? 'bg-forest text-white'
                  : 'bg-sage/60 text-charcoal-muted hover:bg-sage'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Records List */}
      <div className="space-y-4">
        {records.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-sage-border p-8">
            <FileText className="w-10 h-10 text-charcoal-light mx-auto mb-2" />
            <p className="text-sm font-bold text-forest">No records matching criteria.</p>
            <p className="text-xs text-charcoal-muted mt-0.5">Try searching for a different keyword.</p>
          </div>
        ) : (
          records.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-emerald-brand" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-forest">{rec.title}</h3>
                    <p className="text-[11px] text-charcoal-muted">
                      {rec.veterinarian} • {rec.clinic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-charcoal-light">{rec.date}</span>
                  <Badge variant="neutral" size="sm">
                    {rec.category}
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-ivory/60 border border-sage-border text-xs text-charcoal leading-relaxed">
                {rec.description}
              </div>

              {rec.medications && rec.medications.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <Pill className="w-3.5 h-3.5 text-coral shrink-0" />
                  <span className="text-xs font-bold text-forest">Prescribed:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.medications.map((m, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-coral-soft text-coral-dark font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-sage flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-brand">
                  ✓ Certified & Signed by {rec.veterinarian.split(',')[0]}
                </span>
                <button
                  onClick={() => handleExport(rec.title)}
                  className="px-3 py-1.5 rounded-xl border border-sage-border text-xs font-bold text-forest hover:bg-sage/40 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
