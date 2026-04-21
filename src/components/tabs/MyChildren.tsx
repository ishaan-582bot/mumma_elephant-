'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Lock, Unlock, ChevronDown, ChevronUp, CalendarDays,
  Ruler, Syringe, Star, AlertTriangle, FileText, Baby,
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
import TabContent from '@/components/ui/TabContent';
import Card from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import Accordion from '@/components/ui/Accordion';

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

  const handleMilestoneToggle = (milestoneId: string) => {
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
        action={{ label: 'Add Child', onClick: () => {} }}
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
      <div style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        padding: '4px 0 16px',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
      }}>
        {childrenData.map((c) => (
          <motion.div
            key={c.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedChild(c.id)}
            className="min-w-[80px] sm:min-w-[100px] hover:scale-[1.03] transition-transform"
            style={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-full)',
              background: selectedChild === c.id
                ? 'linear-gradient(135deg, var(--blush), var(--mauve))'
                : 'var(--cream-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: selectedChild === c.id ? 'var(--shadow-glow-blush)' : 'none',
              border: selectedChild === c.id ? '3px solid white' : '3px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              {c.isPregnancy ? (
                <Sprout size={28} color={selectedChild === c.id ? 'white' : 'var(--mauve)'} strokeWidth={2} />
              ) : c.photo ? (
                <img src={c.photo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <Baby size={28} color={selectedChild === c.id ? 'white' : 'var(--mauve)'} strokeWidth={2} />
              )}
            </div>
            <span className={`max-w-[80px] truncate text-center text-xs ${selectedChild === c.id ? 'font-bold text-[var(--text-primary)]' : 'font-semibold text-[var(--text-muted)]'}`}
            >
              {c.isPregnancy ? 'Baby on the way' : c.name}
            </span>
            {!c.isPregnancy && (
              <span className={typo.caption}>
                {calculateAge(c.dateOfBirth)}
              </span>
            )}
          </motion.div>
        ))}
        {/* Add Child Card */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="min-w-[80px] sm:min-w-[100px]"
          style={{
            scrollSnapAlign: 'start',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 'var(--radius-full)',
            border: '2px dashed var(--mauve-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--mauve)',
            transition: 'all 0.15s ease',
          }}>
            <Plus size={24} />
          </div>
          <span className="text-xs font-semibold text-[var(--mauve)]">
            Add Child
          </span>
        </motion.div>
      </div>

      {/* Selected Child Profile */}
      {child && (
        <motion.div
          key={child.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card 
            className="mb-4"
            bodyClassName="px-[18px] py-[12px] flex items-center gap-3 w-full"
          >
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--mauve-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={16} color="var(--mauve)" />
            </div>
            <span className={`${typo.bodyMuted} font-semibold`}>
              {publicCount} items are currently <span className="text-[var(--sage-dark)]">visible to your connections</span>. {privateCount} items are private.
            </span>
          </Card>

          {/* Basic Info Cards */}
          {[
            { label: 'Name', value: child.isPregnancy ? 'Baby on the way' : child.name, field: 'name' },
            { label: 'Date of Birth', value: child.isPregnancy ? `Due: ${child.dueDate || 'TBD'}` : child.dateOfBirth, field: 'dob' },
            { label: 'Age', value: child.isPregnancy ? '' : calculateAge(child.dateOfBirth), field: 'age' },
            { label: 'Biological Sex', value: child.sex || 'Not specified', field: 'sex' },
          ].filter(f => f.value).map((field, i) => {
            const isPublic = publicFields[child.id]?.includes(field.field);
            return (
              <motion.div
                key={field.field}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, ease: 'easeOut' }}
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
                
                {/* Modern Toggle Switch */}
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
          <div style={{ marginTop: 16 }}>
            <h3 className={`mb-3 flex items-center gap-2 ${typo.heading}`}>
              <HeartPulse size={18} color="var(--terracotta)" /> Health & Development
            </h3>

            {sections.map((section, i) => (
              <motion.div 
                key={section.id} 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, ease: 'easeOut' }}
              >
                <Accordion
                  title={<>{section.icon} {section.label}</>}
                  isOpen={expandedSection === section.id}
                  onToggle={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                >
                  {/* Growth */}
                        {section.id === 'growth' && (
                          <div>
                            <div style={{ 
                              background: 'var(--sage-light)', 
                              padding: '12px', 
                              borderRadius: 'var(--radius-md)', 
                              marginBottom: 16,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              border: '1px solid rgba(74, 107, 58, 0.1)'
                            }}>
                              <Sparkles size={18} color="var(--sage-dark)" />
                              <p className={`text-[var(--sage-dark)] ${typo.caption} font-semibold`}>
                                Olivia is in the 82nd percentile for weight! She&apos;s growing beautifully and right on track.
                              </p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                              <GrowthChart data={child.weight} color="var(--mauve)" unit="kg" label="Weight Journey" />
                              <GrowthChart data={child.height} color="var(--sky-blue)" unit="cm" label="Height Progress" />
                              
                              <button 
                                onClick={() => showToast("Olivia's health history has been prepared for export.", 'info')}
                                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--bg-card)] py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-150 hover:border-[var(--sage)] hover:bg-[var(--sage-light)] hover:text-[var(--sage-dark)]"
                                style={{
                                  fontFamily: 'inherit',
                                }}
                              >
                                <Share2 size={16} /> Share with Pediatrician
                              </button>
                            </div>

                            {/* AI Prompt */}
                            <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] border-l-4 border-l-[var(--blush)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-sm)]">
                              <div className="mb-2 flex items-center gap-2">
                                <MessageCircle size={16} color="var(--mauve)" />
                                <span className={`${typo.subheading} text-[var(--text-primary)]`}>Ask Mira About Olivia</span>
                              </div>
                              <p className={`mb-3 ${typo.bodyMuted}`}>
                                Get insights on Olivia&apos;s sleep and feeding patterns based on her recent growth.
                              </p>
                              <div className={`flex cursor-pointer items-center justify-between rounded-[var(--radius-md)] bg-white px-3.5 py-2.5 ${typo.caption}`}
                              >
                                <span>Try: &quot;How is Olivia&quot;s growth percentile?&quot;</span>
                                <ArrowRight size={14} />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Vaccinations */}
                        {section.id === 'vaccines' && (
                          <div>
                            {child.vaccinations.map((v) => (
                              <div key={v.id} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '10px 0',
                                borderBottom: '1px solid var(--cream-dark)',
                              }}>
                                <div>
                                  <span className={`${typo.body} font-semibold`}>
                                    {v.name}
                                  </span>
                                  {v.isDue && v.dueDate && (
                                    <div className={`mt-0.5 font-semibold text-[var(--terracotta)] ${typo.caption}`}>
                                      Due: {v.dueDate}
                                    </div>
                                  )}
                                </div>
                                {v.date ? (
                                  <Badge label={`Done · ${v.date}`} variant="success" size="sm" />
                                ) : (
                                  <div style={{ display: 'flex', gap: 6 }}>
                                    {v.isDue && new Date(v.dueDate || '').getTime() < new Date().getTime() && (
                                      <Badge label="OVERDUE" variant="terracotta" size="sm" />
                                    )}
                                    <Badge label={v.isDue ? 'Due Soon' : 'Upcoming'} variant={v.isDue ? 'warning' : 'cream'} size="sm" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Milestones */}
                        {section.id === 'milestones' && (
                          <div>
                            {child.milestones.map((m) => (
                              <div key={m.id} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 0',
                                borderBottom: '1px solid var(--cream-dark)',
                              }}>
                                <motion.button
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => {
                                    if (!m.achieved) {
                                      handleMilestoneToggle(m.id);
                                    }
                                  }}
                                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm text-white"
                                  style={{
                                    border: m.achieved ? 'none' : '2px solid var(--mauve-light)',
                                    background: m.achieved ? 'linear-gradient(135deg, var(--sage), var(--sage-dark))' : 'transparent',
                                    cursor: m.achieved ? 'default' : 'pointer',
                                  }}
                                >
                                  {m.achieved && '✓'}
                                </motion.button>
                                <div>
                                  <span className={`${typo.body} font-semibold ${m.achieved ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                                    {m.label}
                                  </span>
                                  {m.achievedDate && (
                                    <div className={`mt-0.5 flex items-center gap-1 font-semibold text-[var(--sage-dark)] ${typo.caption}`}>
                                      <Star size={12} strokeWidth={2.5} /> {m.achievedDate}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Allergies */}
                        {section.id === 'allergies' && (
                          <div>
                            {child.allergies.length === 0 ? (
                              <p className={`py-2 italic ${typo.bodyMuted}`}>
                                No allergies recorded. That&apos;s great!
                              </p>
                            ) : (
                              child.allergies.map((a, i) => (
                                <div key={i} style={{
                                  display: 'flex', alignItems: 'center', gap: 8,
                                  padding: '8px 0',
                                }}>
                                  <AlertTriangle size={14} color="var(--terracotta)" />
                                  <span className={`${typo.body} font-semibold`}>{a}</span>
                                </div>
                              ))
                            )}
                          </div>
                        )}

                        {/* Medical Notes */}
                        {section.id === 'notes' && (
                          <div>
                            <div className={`mb-2 flex items-center gap-1.5 font-semibold text-[var(--terracotta)] ${typo.caption}`}>
                              <Lock size={12} /> Always private — never shared
                            </div>
                            <p className={`rounded-[var(--radius-sm)] bg-[var(--cream)] p-3 ${typo.body}`}
                            style={{ lineHeight: 1.6 }}
                            >
                              {child.medicalNotes || 'No notes yet.'}
                            </p>
                          </div>
                        )}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      </TabContent>
    </div>
  );
}
