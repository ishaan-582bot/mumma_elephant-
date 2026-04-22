'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Lock, Ruler, Syringe, Star, AlertTriangle, FileText, Baby,
  ShieldCheck, Globe, Share2, Sparkles, MessageCircle, ArrowRight,
  Sprout, HeartPulse,
} from 'lucide-react';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import GrowthChart from '../ui/GrowthChart';
import { useToast } from '../ui/ToastContext';
import { useConfetti } from '../ui/ConfettiContext';
import type { Child } from '@/lib/data';
import { typo } from '@/lib/typography';
import FieldLabel from '@/components/ui/FieldLabel';
import TabContent, { tabViewVariants } from '@/components/ui/TabContent';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import Accordion from '@/components/ui/Accordion';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';

interface MyChildrenProps {
  childrenList: Child[];
}

function calculateAge(dob: string): string {
  const birth = new Date(dob);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0) { years--; months += 12; }
  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  return `${months} month${months !== 1 ? 's' : ''}`;
}

export default function MyChildren({ childrenList: childrenData }: MyChildrenProps) {
  const [selectedChild, setSelectedChild] = useState<string | null>(
    childrenData.length > 0 ? childrenData[0].id : null
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showAddChild, setShowAddChild] = useState(false);
  const { showToast } = useToast();
  const { triggerConfetti } = useConfetti();
  const [publicFields, setPublicFields] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = {};
    childrenData.forEach((c) => { init[c.id] = [...c.publicFields]; });
    return init;
  });

  const child = useMemo(
    () => childrenData.find((c) => c.id === selectedChild) || null,
    [childrenData, selectedChild]
  );

  const toggleFieldPrivacy = (childId: string, field: string) => {
    setPublicFields((prev) => {
      const current = prev[childId] || [];
      if (current.includes(field)) {
        return { ...prev, [childId]: current.filter((f) => f !== field) };
      } else {
        showToast(
          `${field} is now public`,
          'success',
          5000,
          {
            label: 'Undo',
            onClick: () => toggleFieldPrivacy(childId, field)
          }
        );
        return { ...prev, [childId]: [...current, field] };
      }
    });
  };

  const handleMilestoneToggle = () => {
    triggerConfetti();
    showToast('Milestone captured!', 'success');
  };

  if (childrenData.length === 0) {
    return (
      <EmptyState
        icon={<Sprout size={48} color="var(--sage-dark)" strokeWidth={1.5} />}
        title="Your little ones' safe space"
        subtitle="Keep track of milestones, allergies, and the tiny details that matter most. You're building their story."
        hint="Having everything in one place gives you peace of mind during doctor visits and playdates."
        action={{ label: 'Add Child', onClick: () => setShowAddChild(true) }}
        secondaryAction={{ label: 'Skip for Now', onClick: () => {} }}
      />
    );
  }

  const privateCount = child ? 8 - (publicFields[child.id]?.length || 0) : 0;
  const publicCount = child ? (publicFields[child.id]?.length || 0) : 0;

  const sections = [
    { id: 'growth', label: 'Growth', icon: <Ruler size={16} /> },
    { id: 'vaccines', label: 'Vaccinations', icon: <Syringe size={16} /> },
    { id: 'milestones', label: 'Milestones', icon: <Star size={16} /> },
    { id: 'allergies', label: 'Allergies', icon: <AlertTriangle size={16} /> },
    { id: 'notes', label: 'Medical Notes', icon: <FileText size={16} /> },
  ];

  return (
    <div className="fade-in-up">
      <TabContent>

      {/* Child Carousel */}
      <motion.div 
        variants={tabViewVariants.item}
        className="hide-scrollbar mb-6 flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory"
      >
        {childrenData.map((c) => (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedChild(c.id)}
            className="flex min-w-[80px] shrink-0 snap-start flex-col items-center gap-1.5 transition-transform hover:scale-[1.03] sm:min-w-[100px]"
          >
            <div className={`flex h-16 w-16 items-center justify-center rounded-[var(--radius-full)] border-4 transition-all duration-200 ${
              selectedChild === c.id
                ? 'border-white bg-[linear-gradient(135deg,var(--blush),var(--mauve))] shadow-[var(--shadow-glow-blush)]'
                : 'border-transparent bg-[var(--cream-dark)]'
            }`}>
              {c.isPregnancy ? (
                <Sprout size={28} color={selectedChild === c.id ? 'white' : 'var(--mauve)'} strokeWidth={2} />
              ) : c.photo ? (
                <img src={c.photo} alt={c.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                <Baby size={28} color={selectedChild === c.id ? 'white' : 'var(--mauve)'} strokeWidth={2} />
              )}
            </div>
            <span className={`max-w-[80px] truncate text-center text-xs ${selectedChild === c.id ? 'font-bold text-[var(--text-primary)]' : 'font-semibold text-[var(--text-muted)]'}`}
            >
              {c.isPregnancy ? 'Baby' : c.name}
            </span>
            {!c.isPregnancy && (
              <span className={typo.caption}>
                {calculateAge(c.dateOfBirth)}
              </span>
            )}
          </motion.button>
        ))}
        {/* Add Child Card */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddChild(true)}
          className="flex min-w-[80px] shrink-0 snap-start flex-col items-center gap-1.5 sm:min-w-[100px]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-full)] border-2 border-dashed border-[var(--mauve-light)] text-[var(--mauve)] transition-all duration-150 hover:bg-[var(--mauve-light)]/20">
            <Plus size={24} />
          </div>
          <span className="text-xs font-semibold text-[var(--mauve)]">
            Add Child
          </span>
        </motion.button>
      </motion.div>

      {/* Selected Child Profile */}
      {child && (
        <div key={child.id}>
          <motion.div variants={tabViewVariants.item}>
            <Card 
              className="mb-4"
              bodyClassName="px-4.5 py-3 flex items-center gap-3 w-full"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--mauve-light)] text-[var(--mauve)]">
                <ShieldCheck size={16} />
              </div>
              <span className={`${typo.bodyMuted} font-semibold leading-snug`}>
                {publicCount} items are current <span className="text-[var(--sage-dark)] font-bold">visible to connections</span>. {privateCount} items are private.
              </span>
            </Card>
          </motion.div>

          {/* Basic Info Cards */}
          {[
            { label: 'Name', value: child.isPregnancy ? 'Baby on the way' : child.name, field: 'name' },
            { label: 'Date of Birth', value: child.isPregnancy ? `Due: ${child.dueDate || 'TBD'}` : child.dateOfBirth, field: 'dob' },
            { label: 'Age', value: child.isPregnancy ? '' : calculateAge(child.dateOfBirth), field: 'age' },
            { label: 'Biological Sex', value: child.sex || 'Not specified', field: 'sex' },
          ].filter(f => f.value).map((field) => {
            const isPublic = publicFields[child.id]?.includes(field.field);
            return (
              <motion.div
                key={field.field}
                variants={tabViewVariants.item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="mb-2 w-full"
                  bodyClassName="px-4 py-3 flex items-center justify-between w-full"
                >
                  <div>
                  <FieldLabel>{field.label}</FieldLabel>
                  <div className={`mt-0.5 ${typo.fieldValue}`}>
                    {field.value}
                  </div>
                  <div className={`mt-1 flex items-center gap-1 ${typo.caption} ${isPublic ? 'font-semibold text-[var(--sage-dark)]' : ''}`}
                  >
                    {isPublic ? <Globe size={11} /> : <Lock size={11} />}
                    {isPublic ? 'Visible to connections' : 'Only you can see this'}
                  </div>
                </div>
                
                <Toggle
                  checked={isPublic}
                  onChange={() => toggleFieldPrivacy(child.id, field.field)}
                  ariaLabel={`Share ${field.label} with connections`}
                />
                </Card>
              </motion.div>
            );
          })}

          {/* Health Section */}
          <motion.div variants={tabViewVariants.item} className="mt-4">
            <h3 className={`mb-3 flex items-center gap-2 px-1 ${typo.heading}`}>
              <HeartPulse size={18} color="var(--terracotta)" /> Health & Development
            </h3>

            <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <div key={section.id}>
                <Accordion
                  title={<span className="flex items-center gap-2">{section.icon} {section.label}</span>}
                  isOpen={expandedSection === section.id}
                  onToggle={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                >
                  {/* Growth */}
                  {section.id === 'growth' && (
                    <div>
                      <div className="mb-4 flex items-center gap-2.5 rounded-[var(--radius-md)] border border-sage/10 bg-[var(--sage-light)] p-3 shadow-sm border-l-4 border-l-[var(--sage-dark)]">
                        <Sparkles size={18} className="shrink-0 text-[var(--sage-dark)]" />
                        <p className={`text-[var(--sage-dark)] ${typo.caption} font-bold leading-tight`}>
                          Olivia is in the 82nd percentile for weight! She&apos;s growing beautifully and right on track.
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <GrowthChart data={child.weight} color="var(--mauve)" unit="kg" label="Weight Journey" />
                        <GrowthChart data={child.height} color="var(--sky-blue)" unit="cm" label="Height Progress" />
                        
                        <button 
                          onClick={() => showToast("Olivia's health history has been prepared for export.", 'info')}
                          className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--bg-card)] py-3 text-sm font-bold text-[var(--text-secondary)] transition-all duration-150 hover:border-[var(--sage)] hover:bg-[var(--sage-light)] hover:text-[var(--sage-dark)] shadow-sm active:scale-[0.98]"
                        >
                          <Share2 size={16} /> Share with Pediatrician
                        </button>
                      </div>

                      {/* AI Prompt */}
                      <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] border-l-4 border-l-[var(--blush)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-sm)]">
                        <div className="mb-2 flex items-center gap-2">
                          <MessageCircle size={16} color="var(--mauve)" />
                          <span className={`font-bold ${typo.subheading} text-[var(--text-primary)]`}>Ask Mira About Olivia</span>
                        </div>
                        <p className={`mb-3 ${typo.bodyMuted} leading-relaxed`}>
                          Get insights on Olivia&apos;s sleep and feeding patterns based on her recent growth.
                        </p>
                        <button className={`flex w-full cursor-pointer items-center justify-between rounded-[var(--radius-md)] bg-[var(--bg-primary)] px-3.5 py-3 ${typo.caption} border border-[var(--cream-dark)] hover:border-[var(--blush)] transition-colors`}
                        >
                          <span>Try: &quot;How is Olivia&apos;s growth percentile?&quot;</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Vaccinations */}
                  {section.id === 'vaccines' && (
                    <div className="flex flex-col">
                      {child.vaccinations.map((v) => (
                        <div key={v.id} className="flex items-center justify-between border-b border-[var(--cream-dark)] py-3 last:border-none">
                          <div className="min-w-0">
                            <span className={`${typo.body} font-bold block truncate`}>
                              {v.name}
                            </span>
                            {v.isDue && v.dueDate && (
                              <div className={`mt-0.5 font-bold text-[var(--terracotta)] ${typo.caption}`}>
                                Due: {v.dueDate}
                              </div>
                            )}
                          </div>
                          <div className="shrink-0">
                            {v.date ? (
                              <Badge label={`Done · ${v.date}`} variant="success" size="sm" />
                            ) : (
                              <div className="flex gap-1.5">
                                {v.isDue && new Date(v.dueDate || '').getTime() < new Date().getTime() && (
                                  <Badge label="OVERDUE" variant="terracotta" size="sm" />
                                )}
                                <Badge label={v.isDue ? 'Due Soon' : 'Upcoming'} variant={v.isDue ? 'warning' : 'cream'} size="sm" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Milestones */}
                  {section.id === 'milestones' && (
                    <div className="flex flex-col">
                      {child.milestones.map((m) => (
                        <div key={m.id} className="flex items-center gap-3 border-b border-[var(--cream-dark)] py-3 last:border-none">
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => { if (!m.achieved) handleMilestoneToggle(); }}
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all ${
                              m.achieved 
                                ? 'bg-[linear-gradient(135deg,var(--sage),var(--sage-dark))] text-white' 
                                : 'border-2 border-[var(--mauve-light)] text-transparent cursor-pointer'
                            }`}
                          >
                            {m.achieved && '✓'}
                          </motion.button>
                          <div>
                            <span className={`${typo.body} font-bold ${m.achieved ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                              {m.label}
                            </span>
                            {m.achievedDate && (
                              <div className={`mt-0.5 flex items-center gap-1 font-bold text-[var(--sage-dark)] ${typo.caption}`}>
                                <Star size={12} strokeWidth={3} /> {m.achievedDate}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Allergies */}
                  {section.id === 'allergies' && (
                    <div className="flex flex-col gap-2 py-1">
                      {child.allergies.length === 0 ? (
                        <p className={`py-2 italic ${typo.bodyMuted}`}>
                          No allergies recorded. That&apos;s great!
                        </p>
                      ) : (
                        child.allergies.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--terracotta-light)]/10 p-3">
                            <AlertTriangle size={14} className="text-[var(--terracotta)] shrink-0" />
                            <span className={`${typo.body} font-bold text-[var(--terracotta)]`}>{a}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Medical Notes */}
                  {section.id === 'notes' && (
                    <div>
                      <div className={`mb-2 flex items-center gap-1.5 font-bold text-[var(--terracotta)] ${typo.caption}`}>
                        <Lock size={12} /> Encrypted & Private
                      </div>
                      <p className={`rounded-[var(--radius-md)] bg-[var(--cream)] p-4 ${typo.body} leading-relaxed shadow-inner border border-[var(--cream-dark)]`}>
                        {child.medicalNotes || 'No notes added yet.'}
                      </p>
                    </div>
                  )}
                </Accordion>
              </div>
            ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Child Sheet */}
      <BottomSheet
        isOpen={showAddChild}
        onClose={() => setShowAddChild(false)}
        title="Welcome a Little One"
      >
        <div className="flex flex-col gap-4">
          <p className={`${typo.bodyMuted} mb-2 leading-relaxed px-1`}>
            Track milestones, growth percentiles, and important medical records for your child. Everything is encrypted for their privacy.
          </p>

          <FormField label="Child's Name" htmlFor="child-name">
            <input type="text" id="child-name" placeholder="Name or Nickname" className="w-full rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--blush)]" />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date of Birth" htmlFor="child-dob">
              <input type="date" id="child-dob" className="w-full rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--bg-primary)] px-3 py-3 text-sm font-bold outline-none focus:border-[var(--blush)]" />
            </FormField>
            <FormField label="Biological Sex" htmlFor="child-sex">
              <select id="child-sex" className="w-full rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--bg-primary)] px-3 py-3 text-sm font-bold outline-none focus:border-[var(--blush)] appearance-none">
                <option value="none">Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </FormField>
          </div>

          <div className="mb-2 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--cream)] p-4">
             <h4 className={`mb-1.5 flex items-center gap-2 ${typo.subheading}`}>
               <Sprout size={16} className="text-[var(--mauve)]" /> Still Pregnant?
             </h4>
             <p className={typo.caption}>
               You can add a pregnancy to track your journey and due date, and switch to a child profile later.
             </p>
             <button className="mt-3 text-sm font-extrabold text-[var(--mauve-dark)] underline underline-offset-4 decoration-[var(--mauve-light)]">
               Register as Pregnancy
             </button>
          </div>

          <Button 
            onClick={() => {
              setShowAddChild(false);
              showToast('Processing your registration...', 'success');
              triggerConfetti();
            }}
            className="mt-2"
          >
            Add Profile 🌸
          </Button>
        </div>
      </BottomSheet>
      </TabContent>
    </div>
  );
}
