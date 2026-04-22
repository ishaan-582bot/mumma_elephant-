'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, MapPin, Mail, Phone, Globe, ShieldCheck,
  Clock, AlertCircle, Check, X, TrendingUp
} from 'lucide-react';
import Badge from '../ui/Badge';
import { useConfetti } from '../ui/ConfettiContext';
import { useToast } from '../ui/ToastContext';
import { type UserProfile, calculateProfileCompletion } from '@/lib/data';
import { inputClassName } from '@/lib/utils';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import { typo } from '@/lib/typography';
import FieldLabel from '@/components/ui/FieldLabel';

interface PersonalInfoProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
  initialEditMode?: boolean;
  onEditConsumed?: () => void;
}

type EditableFieldKey = 'name' | 'occupation' | 'country' | 'location' | 'email' | 'phone';

export default function PersonalInfo({
  user,
  onUpdate,
  initialEditMode,
  onEditConsumed,
}: PersonalInfoProps) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();
  const { triggerConfetti } = useConfetti();

  const [completionDiff, setCompletionDiff] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const prevCompletion = React.useRef(user.profileCompletion);

  React.useEffect(() => {
    if (user.profileCompletion > prevCompletion.current) {
      const diff = user.profileCompletion - prevCompletion.current;
      setCompletionDiff(diff);
      setIsFlashing(true);
      const flashTimer = setTimeout(() => setIsFlashing(false), 700);
      const textTimer = setTimeout(() => setCompletionDiff(null), 2500);
      return () => { clearTimeout(flashTimer); clearTimeout(textTimer); };
    }
    prevCompletion.current = user.profileCompletion;
  }, [user.profileCompletion]);

  React.useEffect(() => {
    if (initialEditMode) {
      setEditing(true);
      onEditConsumed?.();
    }
  }, [initialEditMode, onEditConsumed]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!editData.name.trim()) newErrors.name = 'Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(editData.email)) newErrors.email = 'Please enter a valid email';
    if (editData.phone && !/^[0-9+\s-]{8,20}$/.test(editData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const updatedData = { ...editData, profileCompletion: calculateProfileCompletion(editData) };
    if (updatedData.motherhoodStage !== user.motherhoodStage) {
      triggerConfetti();
      showToast(`Congratulations on your new journey as ${updatedData.motherhoodStage}! 🎉`, 'success');
    } else {
      showToast('Profile updated successfully ✨', 'success');
    }
    onUpdate(updatedData);
    setEditing(false);
    setErrors({});
  };

  const fields = [
    { icon: <User size={17} strokeWidth={2} />, label: 'Name', value: user.name, key: 'name' as EditableFieldKey },
    { icon: <Briefcase size={17} strokeWidth={2} />, label: 'Occupation', value: user.occupation, key: 'occupation' as EditableFieldKey, optional: true },
    { icon: <Globe size={17} strokeWidth={2} />, label: 'Country', value: `${user.countryFlag} ${user.country}`, key: 'country' as EditableFieldKey },
    { icon: <MapPin size={17} strokeWidth={2} />, label: 'Location', value: user.location, key: 'location' as EditableFieldKey, optional: true, helpText: 'Find local community groups and nearby mums' },
    { icon: <Mail size={17} strokeWidth={2} />, label: 'Email', value: user.email, key: 'email' as EditableFieldKey, masked: true },
    { icon: <Phone size={17} strokeWidth={2} />, label: 'Phone', value: user.phone, key: 'phone' as EditableFieldKey, masked: true },
  ];

  const stages: UserProfile['motherhoodStage'][] = [
    'Trying to Conceive', 'Pregnant', 'New Mum', 'Toddler Mum', 'Experienced Mum'
  ];

  return (
    <div className="fade-in-up">
      <TabContent maxWidth="max-w-3xl">
        <div className="lg:max-w-2xl">
          {/* Progress Card */}
          <motion.div variants={tabViewVariants.item}>
            <Card className="mb-5" bodyClassName="px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[var(--sage)]" />
                  <span className={typo.subheading}>
                    Your profile is <strong className="text-[var(--text-primary)]">{user.profileCompletion}%</strong> complete
                  </span>
                </div>
                <span className={`${typo.caption} font-bold text-[var(--blush-deep)]`}>
                  {user.profileCompletion}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-[var(--radius-full)] bg-[var(--cream-deep)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${user.profileCompletion}%`,
                    background: isFlashing
                      ? ['linear-gradient(90deg,var(--blush),var(--blush-deep))', 'var(--sage)', 'linear-gradient(90deg,var(--blush),var(--blush-deep))']
                      : 'linear-gradient(90deg,var(--blush),var(--terracotta))',
                  }}
                  transition={{ duration: isFlashing ? 0.7 : 1, ease: 'easeOut' }}
                  className="h-full rounded-[var(--radius-full)]"
                />
              </div>
              <div className="relative mt-1">
                <AnimatePresence>
                  {completionDiff && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.85 }}
                      animate={{ opacity: 1, y: -18, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as any }}
                      className="absolute right-0 rounded-[var(--radius-md)] bg-[var(--sage)] px-2.5 py-1 text-xs font-bold text-white shadow-[var(--shadow-elevated)]"
                    >
                      +{completionDiff}%
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Edit Toggle */}
          <motion.div variants={tabViewVariants.item} className="mb-3 flex justify-end">
            {editing ? (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => { setEditing(false); setEditData(user); setErrors({}); }}
                >
                  <X size={16} /> Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="!bg-gradient-to-r !from-[var(--sage)] !to-[var(--sage-deep)] hover:!from-[var(--sage-deep)] hover:!to-[#6B8E69] !text-white !border-transparent"
                >
                  <Check size={16} /> Save
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                <Briefcase size={14} /> Edit Info
              </Button>
            )}
          </motion.div>

          {/* Motherhood Stage */}
          <motion.div variants={tabViewVariants.item} className="mb-3">
            <Card elevation="elevated" hover>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--blush-soft)] to-[var(--blush-soft)]/50 text-[var(--blush-deep)]">
                  <Clock size={18} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <FieldLabel>Motherhood Stage</FieldLabel>
                  {editing ? (
                    <>
                      <select
                        value={editData.motherhoodStage}
                        onChange={(e) => setEditData({ ...editData, motherhoodStage: e.target.value as UserProfile['motherhoodStage'] })}
                        className={`${inputClassName} mt-1.5`}
                      >
                        {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <p className={`mt-2 italic ${typo.caption}`}>
                        This helps us personalize content and connect you with mums at similar stages
                      </p>
                    </>
                  ) : (
                    <div className="mt-1">
                      <Badge label={`${user.motherhoodStage} \u00B7 ${user.motherhoodMonths} months`} variant="blush" dot />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Fields */}
          <motion.div variants={tabViewVariants.item} className="flex flex-col gap-2">
            {fields.map((field) => (
              <motion.div
                key={field.key}
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                <Card
                  density="compact"
                  elevation="resting"
                  hover
                  bodyClassName="px-4 py-3.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--cream-deep)]/70 text-[var(--text-muted)]">
                      {field.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      {editing && !field.masked ? (
                        <FormField
                          label={field.label}
                          htmlFor={`profile-${field.key}`}
                          error={errors[field.key]}
                          hint={!errors[field.key] ? field.helpText : undefined}
                        >
                          <input
                            id={`profile-${field.key}`}
                            type="text"
                            value={editData[field.key] || ''}
                            onChange={(e) => setEditData({ ...editData, [field.key]: e.target.value })}
                            placeholder={field.optional ? `Add ${field.label.toLowerCase()}` : ''}
                            className={inputClassName}
                          />
                        </FormField>
                      ) : (
                        <>
                          <FieldLabel>{field.label}</FieldLabel>
                          <div className={`mt-1 ${typo.fieldValue}`}>
                            {field.value || (
                              <span className="cursor-pointer italic text-[var(--blush-deep)]">
                                Add {field.label.toLowerCase()}
                              </span>
                            )}
                            {field.masked && (
                              <Badge label="Private" variant="cream" size="sm" className="ml-2" dot />
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Verification Status */}
          <motion.div variants={tabViewVariants.item} className="mt-3">
            <Card elevation="resting" hover bodyClassName="px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)]"
                  style={{
                    background: user.verificationStatus === 'Verified' ? 'var(--success-soft)' : 'var(--cream-deep)',
                    color: user.verificationStatus === 'Verified' ? 'var(--status-success)' : 'var(--text-muted)',
                  }}
                >
                  {user.verificationStatus === 'Verified' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
                </div>
                <div>
                  <FieldLabel>ID Verification</FieldLabel>
                  <div className="mt-1">
                    <Badge
                      label={
                        user.verificationStatus === 'Verified' ? 'Verified' :
                        user.verificationStatus === 'Pending' ? 'Pending' : 'Not Submitted'
                      }
                      variant={
                        user.verificationStatus === 'Verified' ? 'success' :
                        user.verificationStatus === 'Pending' ? 'warning' : 'cream'
                      }
                      size="sm"
                      dot
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </TabContent>
    </div>
  );
}
