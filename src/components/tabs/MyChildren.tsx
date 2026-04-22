'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Lock, Ruler, Syringe, Star, AlertTriangle, FileText, Baby,
  ShieldCheck, Globe, Share2, Sparkles, MessageCircle, ArrowRight,
  Sprout, HeartPulse, TrendingUp
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
  if (years > 0) return `${years}y ${months}m`;
  return `${months}mo`;
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
        showToast(`${field} is now visible to connections`, 'success', 5000, {
          label: 'Undo',
          onClick: () => toggleFieldPrivacy(childId, field)
        });
        return { ...prev, [childId]: [...current, field] };
      }
    });
  };

  const handleMilestoneToggle = () => {
    triggerConfetti();
    showToast('Milestone captured! ✨', 'success');
  };

  if (childrenData.length === 0) {
    return (
      <EmptyState
        icon={<Sprout size={44} className="text-[var(--sage-deep)]" strokeWidth={1.5} />}
        title="Your little ones' safe space"
        subtitle="Keep track of milestones, allergies, and the tiny details that matter most. You're building their story."
        hint="Having everything in one place gives you peace of mind during doctor visits and playdates."
        action={{ label: 'Add Child', onClick: () => setShowAddChild(true) }}
        secondaryAction={{ label: 'Skip for Now', onClick: () => { } }}
      />
    );
  }

  const privateCount = child ? 8 - (publicFields[child.id]?.length || 0) : 0;
  const publicCount = child ? (publicFields[child.id]?.length || 0) : 0;

  const sections = [
    { id: 'growth', label: 'Growth', icon: <Ruler size={15} /> },
    { id: 'vaccines', label: 'Vaccinations', icon: <Syringe size={15} /> },
    { id: 'milestones', label: 'Milestones', icon: <Star size={15} /> },
    { id: 'allergies', label: 'Allergies', icon: <AlertTriangle size={15} /> },
    { id: 'notes', label: 'Medical Notes', icon: <FileText size={15} /> },
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
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedChild(c.id)}
              className="flex min-w-[76px] shrink-0 snap-start flex-col items-center gap-2 transition-transform hover:scale-[1.03] sm:min-w-[92px]"
            >
              <div className={`flex h-[60px] w-[60px] items-center justify-center rounded-[var(--radius-full)] border-[3px] transition-all duration-300 sm:h-16 sm:w-16 ${
                selectedChild === c.id
                  ? 'border-white bg-gradient-to-br from-[var(--blush)] to-[var(--mauve)] shadow-[var(--shadow-glow-blush)]'
                  : 'border-transparent bg-[var(--cream-deep)]'
              }`}>
                {c.isPregnancy ? (
                  <Sprout size={26} color={selectedChild === c.id ? 'white' : 'var(--mauve)'} strokeWidth={2} />
                ) : c.photo ? (
                  <img src={c.photo} alt={c.name} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <Baby size={26} color={selectedChild === c.id ? 'white' : 'var(--mauve)'} strokeWidth={2} />
                )}
              </div>
              <span className={`max-w-[76px] truncate text-center text-[11px] font-semibold sm:text-xs ${selectedChild === c.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                {c.isPregnancy ? 'Baby' : c.name}
              </span>
              {!c.isPregnancy && (
                <span className={typo.caption}>{calculateAge(c.dateOfBirth)}</span>
              )}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowAddChild(true)}
            className="flex min-w-[76px] shrink-0 snap-start flex-col items-center gap-2 sm:min-w-[92px]"
          >
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[var(--radius-full)] border-2 border-dashed border-[var(--mauve-soft)] text-[var(--mauve)] transition-all duration-200 hover:bg-[var(--mauve-soft)]/30 sm:h-16 sm:w-16">
              <Plus size={22} />
            </div>
            <span className="text-[11px] font-semibold text-[var(--mauve)] sm:text-xs">Add Child</span>
          </motion.button>
        </motion.div>

        {/* Selected Child Profile */}
        {child && (
          <div key={child.id}>
            <motion.div variants={tabViewVariants.item}>
              <Card className="mb-4" bodyClassName="px-4 py-3 flex items-center gap-3" elevation="resting" hover={false}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--mauve-soft)] text-[var(--mauve)]">
                  <ShieldCheck size={15} />
                </div>
                <span className={`${typo.caption} font-medium leading-snug`}>
                  <strong className="text-[var(--sage-deep)]">{publicCount}</strong> visible to connections &middot;{' '}
                  <strong className="text-[var(--text-muted)]">{privateCount}</strong> private
                </span>
              </Card>
            </motion.div>

            {/* Info Cards */}
            {[
              { label: 'Name', value: child.isPregnancy ? 'Baby on the way' : child.name, field: 'name' },
              { label: 'Date of Birth', value: child.isPregnancy ? `Due: ${child.dueDate || 'TBD'}` : child.dateOfBirth, field: 'dob' },
              { label: 'Age', value: child.isPregnancy ? '' : calculateAge(child.dateOfBirth), field: 'age' },
              { label: 'Biological Sex', value: child.sex || 'Not specified', field: 'sex' },
            ].filter((f) => f.value).map((field) => {
              const isPublic = publicFields[child.id]?.includes(field.field);
              return (
                <motion.div
                  key={field.field}
                  variants={tabViewVariants.item}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="mb-2" bodyClassName="px-4 py-3 flex items-center justify-between" elevation="resting" hover>
                    <div>
                      <FieldLabel>{field.label}</FieldLabel>
                      <div className={`mt-0.5 ${typo.fieldValue}`}>{field.value}</div>
                      <div className={`mt-1 flex items-center gap-1 ${typo.caption} ${isPublic ? 'text-[var(--sage-deep)]' : ''}`}>
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
            <motion.div variants={tabViewVariants.item} className="mt-5">
              <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
                <HeartPulse size={17} className="text-[var(--terracotta)]" /> Health & Development
              </h3>
              <div className="flex flex-col gap-2">
                {sections.map((section) => (
                  <div key={section.id}>
                    <Accordion
                      title={<span className="flex items-center gap-2">{section.icon} {section.label}</span>}
                      isOpen={expandedSection === section.id}
                      onToggle={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      gradientBorder={section.id === 'growth' ? 'var(--sage)' : section.id === 'vaccines' ? 'var(--sky-blue)' : section.id === 'milestones' ? 'var(--blush)' : section.id === 'allergies' ? 'var(--terracotta)' : 'var(--mauve)'}
                    >
                      {section.id === 'growth' && (
                        <div>
                          <div className="mb-4 flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--sage)]/10 bg-[var(--sage-soft)] p-3 shadow-sm border-l-[3px] border-l-[var(--sage-deep)]">
                            <Sparkles size={17} className="shrink-0 text-[var(--sage-deep)]" />
                            <p className={`text-[var(--sage-deep)] ${typo.caption} font-bold leading-tight`}>
                              Olivia is in the 82nd percentile for weight! Growing beautifully.
                            </p>
                          </div>
                          <div className="flex flex-col gap-4">
                            <GrowthChart data={child.weight} color="var(--mauve)" unit="kg" label="Weight Journey" />
                            <GrowthChart data={child.height} color="var(--sky-blue)" unit="cm" label="Height Progress" />
                            <button
                              onClick={() => showToast("Olivia's health history has been prepared for export.", 'info')}
                              className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-card)] py-3 text-sm font-bold text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--sage)] hover:bg-[var(--sage-soft)] hover:text-[var(--sage-deep)] shadow-sm active:scale-[0.98]"
                            >
                              <Share2 size={15} /> Share with Pediatrician
                            </button>
                          </div>
                          <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--border)] border-l-[3px] border-l-[var(--blush)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-resting)]">
                            <div className="mb-2 flex items-center gap-2">
                              <MessageCircle size={15} className="text-[var(--mauve)]" />
                              <span className={`font-bold ${typo.subheading}`}>Ask Mira About Olivia</span>
                            </div>
                            <p className={`mb-3 ${typo.caption} leading-relaxed`}>
                              Get insights on sleep and feeding patterns based on recent growth.
                            </p>
                            <button className={`flex w-full cursor-pointer items-center justify-between rounded-[var(--radius-md)] bg-[var(--bg-primary)] px-3.5 py-3 ${typo.caption} border border-[var(--border)] hover:border-[var(--blush)] transition-colors`}>
                              <span>Try: &ldquo;How is Olivia's growth percentile?&rdquo;</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      )}

                      {section.id === 'vaccines' && (
                        <div className="flex flex-col">
                          {child.vaccinations.map((v) => (
                            <div key={v.id} className="flex items-center justify-between border-b border-[var(--border-light)] py-3 last:border-none">
                              <div className="min-w-0">
                                <span className={`${typo.body} font-bold block truncate`}>{v.name}</span>
                                {v.isDue && v.dueDate && (
                                  <div className={`mt-0.5 font-bold text-[var(--status-error)] ${typo.caption}`}>
                                    Due: {v.dueDate}
                                  </div>
                                )}
                              </div>
                              <div className="shrink-0">
                                {v.date ? (
                                  <Badge label={`Done \u00B7 ${v.date}`} variant="success" size="sm" dot />
                                ) : (
                                  <div className="flex gap-1.5">
                                    {v.isDue && new Date(v.dueDate || '').getTime() < new Date().getTime() && (
                                      <Badge label="OVERDUE" variant="error" size="sm" />
                                    )}
                                    <Badge label={v.isDue ? 'Due Soon' : 'Upcoming'} variant={v.isDue ? 'warning' : 'cream'} size="sm" />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === 'milestones' && (
                        <div className="flex flex-col">
                          {child.milestones.map((m) => (
                            <div key={m.id} className="flex items-center gap-3 border-b border-[var(--border-light)] py-3 last:border-none">
                              <motion.button
                                whileTap={{ scale: 0.78 }}
                                onClick={() => { if (!m.achieved) handleMilestoneToggle(); }}
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all ${
                                  m.achieved
                                    ? 'bg-gradient-to-br from-[var(--sage)] to-[var(--sage-deep)] text-white'
                                    : 'border-2 border-[var(--border)] text-transparent cursor-pointer hover:border-[var(--blush)]'
                                }`}
                              >
                                {m.achieved && '\u2713'}
                              </motion.button>
                              <div>
                                <span className={`${typo.body} font-bold ${m.achieved ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                                  {m.label}
                                </span>
                                {m.achievedDate && (
                                  <div className={`mt-0.5 flex items-center gap-1 font-bold text-[var(--sage-deep)] ${typo.caption}`}>
                                    <Star size={11} strokeWidth={3} /> {m.achievedDate}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === 'allergies' && (
                        <div className="flex flex-col gap-2 py-1">
                          {child.allergies.length === 0 ? (
                            <p className={`py-2 italic ${typo.bodyMuted}`}>No allergies recorded. That's great!</p>
                          ) : (
                            child.allergies.map((a, i) => (
                              <div key={i} className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--error-soft)]/50 p-3">
                                <AlertTriangle size={14} className="text-[var(--status-error)] shrink-0" />
                                <span className={`${typo.body} font-bold text-[var(--status-error)]`}>{a}</span>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {section.id === 'notes' && (
                        <div>
                          <div className={`mb-2 flex items-center gap-1.5 font-bold text-[var(--status-error)] ${typo.caption}`}>
                            <Lock size={12} /> Encrypted & Private
                          </div>
                          <p className={`rounded-[var(--radius-md)] bg-[var(--cream-deep)]/50 p-4 ${typo.body} leading-relaxed shadow-inner border border-[var(--border-light)]`}>
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
        <BottomSheet isOpen={showAddChild} onClose={() => setShowAddChild(false)} title="Welcome a Little One">
          <div className="flex flex-col gap-4">
            <p className={`${typo.bodyMuted} mb-2 leading-relaxed px-1`}>
              Track milestones, growth percentiles, and important medical records. Everything is encrypted for their privacy.
            </p>
            <FormField label="Child's Name" htmlFor="child-name">
              <input type="text" id="child-name" placeholder="Name or Nickname" className="w-full rounded-[var(--radius-md)] border-2 border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm font-bold outline-none focus:border-[var(--blush)]" />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Date of Birth" htmlFor="child-dob">
                <input type="date" id="child-dob" className="w-full rounded-[var(--radius-md)] border-2 border-[var(--border)] bg-[var(--bg-primary)] px-3 py-3 text-sm font-bold outline-none focus:border-[var(--blush)]" />
              </FormField>
              <FormField label="Biological Sex" htmlFor="child-sex">
                <select id="child-sex" className="w-full rounded-[var(--radius-md)] border-2 border-[var(--border)] bg-[var(--bg-primary)] px-3 py-3 text-sm font-bold outline-none focus:border-[var(--blush)] appearance-none">
                  <option value="none">Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </FormField>
            </div>
            <div className="mb-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--cream-deep)]/40 p-4">
              <h4 className={`mb-1.5 flex items-center gap-2 ${typo.subheading}`}>
                <Sprout size={15} className="text-[var(--mauve)]" /> Still Pregnant?
              </h4>
              <p className={typo.caption}>
                You can add a pregnancy to track your journey and due date, and switch to a child profile later.
              </p>
              <button className="mt-3 text-sm font-extrabold text-[var(--mauve-deep)] underline underline-offset-4 decoration-[var(--mauve-soft)]">
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
              Add Profile
            </Button>
          </div>
        </BottomSheet>
      </TabContent>
    </div>
  );
}
