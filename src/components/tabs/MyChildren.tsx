'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Lock, Unlock, ChevronDown, ChevronUp, CalendarDays,
  Scale, Ruler, Syringe, Star, AlertTriangle, FileText, Baby,
  ShieldCheck, Globe, Share2, Sparkles, MessageCircle, ArrowRight
} from 'lucide-react';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import ConfettiEffect from '../ui/ConfettiEffect';
import Toast from '../ui/Toast';
import GrowthChart from '../ui/GrowthChart';
import type { Child } from '@/lib/data';

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type?: 'success' | 'warning' | 'info' | 'error' | 'default';
    action?: { label: string; onClick: () => void };
  }>({ show: false, message: '', type: 'default' });
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
        setToast({
          show: true,
          message: `${field} is now public`,
          type: 'success',
          action: {
            label: 'Undo',
            onClick: () => toggleFieldPrivacy(childId, field)
          }
        });
        return { ...prev, [childId]: [...current, field] };
      }
    });
  };

  const handleMilestoneToggle = (milestoneId: string) => {
    setShowConfetti(true);
    setToast({
      show: true,
      message: 'Milestone captured! 🌟🐘',
      type: 'success'
    });
    setTimeout(() => setShowConfetti(false), 2000);
  };

  if (childrenData.length === 0) {
    return (
      <EmptyState
        icon="🌿"
        title="Your little ones' safe space 🐘"
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
    <div className="fade-in-up" style={{ padding: '16px', maxWidth: 600, margin: '0 auto' }}>
      <ConfettiEffect trigger={showConfetti} />
      <Toast
        message={toast.message}
        show={toast.show}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
        action={toast.action}
      />

      {/* Child Carousel */}
      <div style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        padding: '4px 0 16px',
        scrollSnapType: 'x mandatory',
      }}>
        {childrenData.map((c) => (
          <motion.div
            key={c.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedChild(c.id)}
            style={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
              width: 90,
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
              fontSize: 28,
              boxShadow: selectedChild === c.id ? 'var(--shadow-glow-blush)' : 'none',
              border: selectedChild === c.id ? '3px solid white' : '3px solid transparent',
              transition: 'all 0.2s ease',
            }}>
              {c.isPregnancy ? '🌿' : (c.photo ? <img src={c.photo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : '👶')}
            </div>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: selectedChild === c.id ? 700 : 600,
              color: selectedChild === c.id ? 'var(--text-primary)' : 'var(--text-muted)',
              textAlign: 'center',
              maxWidth: 80,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {c.isPregnancy ? 'Baby on the way' : c.name}
            </span>
            {!c.isPregnancy && (
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                {calculateAge(c.dateOfBirth)}
              </span>
            )}
          </motion.div>
        ))}
        {/* Add Child Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            scrollSnapAlign: 'start',
            flexShrink: 0,
            width: 90,
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
          }}>
            <Plus size={24} />
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--mauve)' }}>
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
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 18px',
            marginBottom: 16,
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid var(--cream-dark)',
          }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--mauve-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={16} color="var(--mauve)" />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {publicCount} items are currently <span style={{ color: 'var(--sage-dark)' }}>visible to your connections</span>. {privateCount} items are private.
            </span>
          </div>

          {/* Basic Info Cards */}
          {[
            { label: 'Name', value: child.isPregnancy ? 'Baby on the way 🌿' : child.name, field: 'name' },
            { label: 'Date of Birth', value: child.isPregnancy ? `Due: ${child.dueDate || 'TBD'}` : child.dateOfBirth, field: 'dob' },
            { label: 'Age', value: child.isPregnancy ? '' : calculateAge(child.dateOfBirth), field: 'age' },
            { label: 'Biological Sex', value: child.sex || 'Not specified', field: 'sex' },
          ].filter(f => f.value).map((field, i) => {
            const isPublic = publicFields[child.id]?.includes(field.field);
            return (
              <div
                key={field.field}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 16px',
                  marginBottom: 8,
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {field.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                    {field.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: isPublic ? 'var(--sage-dark)' : 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isPublic ? <Globe size={11} /> : <Lock size={11} />}
                    {isPublic ? 'Visible to connections' : 'Only you can see this'}
                  </div>
                </div>
                
                {/* Modern Toggle Switch */}
                <div 
                  onClick={() => toggleFieldPrivacy(child.id, field.field)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 'var(--radius-full)',
                    background: isPublic ? 'var(--sage)' : 'var(--cream-dark)',
                    padding: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isPublic ? 'flex-end' : 'flex-start',
                    transition: 'background-color 0.2s ease',
                  }}
                  role="switch"
                  aria-checked={isPublic}
                  aria-label={`Share ${field.label} with connections`}
                >
                  <motion.div 
                    layout
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 'var(--radius-full)',
                      background: 'white',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
            );
          })}

          {/* Health Section */}
          <div style={{ marginTop: 16 }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>💊</span> Health & Development
            </h3>

            {sections.map((section) => (
              <div key={section.id} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-card)',
                    borderRadius: expandedSection === section.id
                      ? 'var(--radius-lg) var(--radius-lg) 0 0'
                      : 'var(--radius-lg)',
                    padding: '14px 16px',
                    border: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {section.icon} {section.label}
                  </span>
                  {expandedSection === section.id ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </button>

                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        overflow: 'hidden',
                        background: 'var(--bg-card)',
                        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      <div style={{ padding: '0 16px 16px' }}>
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
                              <p style={{ fontSize: '0.78rem', color: 'var(--sage-dark)', fontWeight: 600, lineHeight: 1.4 }}>
                                Olivia is in the 82nd percentile for weight! She&apos;s growing beautifully and right on track. ✨
                              </p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                              <GrowthChart data={child.weight} color="var(--mauve)" unit="kg" label="Weight Journey" />
                              <GrowthChart data={child.height} color="var(--sky-blue)" unit="cm" label="Height Progress" />
                              
                              <button 
                                onClick={() => setToast({ show: true, message: 'Olivia\'s health history has been prepared for export! 📄', type: 'info' })}
                                style={{
                                  width: '100%',
                                  padding: '12px',
                                  borderRadius: 'var(--radius-md)',
                                  background: 'var(--bg-card)',
                                  border: '2px solid var(--cream-dark)',
                                  color: 'var(--text-secondary)',
                                  fontSize: '0.85rem',
                                  fontWeight: 700,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 8,
                                  cursor: 'pointer',
                                  marginTop: 8,
                                }}
                              >
                                <Share2 size={16} /> Share with Pediatrician
                              </button>
                            </div>

                            {/* AI Prompt */}
                            <div style={{ marginTop: 20, padding: 16, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--mauve-light), var(--sky-blue-light))', border: '1px solid rgba(138, 107, 138, 0.1)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <MessageCircle size={16} color="var(--mauve)" />
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Ask Mira About Olivia</span>
                              </div>
                              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                                Get insights on Olivia&apos;s sleep and feeding patterns based on her recent growth.
                              </p>
                              <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
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
                                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {v.name}
                                  </span>
                                  {v.isDue && v.dueDate && (
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--terracotta)', marginTop: 2 }}>
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
                                      setShowConfetti(true);
                                      setTimeout(() => setShowConfetti(false), 3000);
                                      setToast({ show: true, message: `Amazing! Olivia reached a new milestone: ${m.label} 🎉`, type: 'success' });
                                    }
                                  }}
                                  style={{
                                    width: 28, height: 28, borderRadius: 'var(--radius-full)',
                                    border: m.achieved ? 'none' : '2px solid var(--mauve-light)',
                                    background: m.achieved ? 'linear-gradient(135deg, var(--sage), var(--sage-dark))' : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: m.achieved ? 'default' : 'pointer',
                                    color: 'white', fontSize: '0.8rem', flexShrink: 0,
                                  }}
                                >
                                  {m.achieved && '✓'}
                                </motion.button>
                                <div>
                                  <span style={{
                                    fontSize: '0.85rem', fontWeight: 600,
                                    color: m.achieved ? 'var(--text-primary)' : 'var(--text-muted)',
                                    textDecoration: m.achieved ? 'none' : 'none',
                                  }}>
                                    {m.label}
                                  </span>
                                  {m.achievedDate && (
                                    <div style={{ fontSize: '0.7rem', color: 'var(--sage-dark)', fontWeight: 600, marginTop: 2 }}>
                                      🎉 {m.achievedDate}
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
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
                                No allergies recorded. That&apos;s great! 🌸
                              </p>
                            ) : (
                              child.allergies.map((a, i) => (
                                <div key={i} style={{
                                  display: 'flex', alignItems: 'center', gap: 8,
                                  padding: '8px 0',
                                }}>
                                  <AlertTriangle size={14} color="var(--terracotta)" />
                                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a}</span>
                                </div>
                              ))
                            )}
                          </div>
                        )}

                        {/* Medical Notes */}
                        {section.id === 'notes' && (
                          <div>
                            <div style={{
                              display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8,
                              fontSize: '0.72rem', fontWeight: 700, color: 'var(--terracotta)',
                            }}>
                              <Lock size={12} /> Always private — never shared
                            </div>
                            <p style={{
                              fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.6,
                              background: 'var(--cream)',
                              borderRadius: 'var(--radius-sm)',
                              padding: '12px',
                            }}>
                              {child.medicalNotes || 'No notes yet.'}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
