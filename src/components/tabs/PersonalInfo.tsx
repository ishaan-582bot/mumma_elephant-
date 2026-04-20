'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, MapPin, Mail, Phone, Globe, ShieldCheck,
  Clock, AlertCircle, Check, X
} from 'lucide-react';
import Badge from '../ui/Badge';
import ConfettiEffect from '../ui/ConfettiEffect';
import Toast from '../ui/Toast';
import { type UserProfile, calculateProfileCompletion } from '@/lib/data';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import TabContent from '../ui/TabContent';
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
  onEditConsumed 
}: PersonalInfoProps) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(user);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState({ 
    show: false, 
    message: '', 
    type: 'default' as 'success' | 'warning' | 'info' | 'error' | 'default' 
  });

  // Handle external edit requests from header
  React.useEffect(() => {
    if (initialEditMode) {
      setEditing(true);
      onEditConsumed?.();
    }
  }, [initialEditMode, onEditConsumed]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!editData.name.trim()) newErrors.name = 'Name is required';
    
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!editData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(editData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (editData.phone && !/^[0-9+\s-]{8,20}$/.test(editData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Recalculate completion percentage
    const updatedData = {
      ...editData,
      profileCompletion: calculateProfileCompletion(editData)
    };

    if (updatedData.motherhoodStage !== user.motherhoodStage) {
      setShowConfetti(true);
      setToast({ 
        show: true, 
        message: `Congratulations on your new journey as ${updatedData.motherhoodStage}! 🎉`,
        type: 'success'
      });
    }
    onUpdate(updatedData);
    setEditing(false);
    setErrors({});
  };

  const fields: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    key: EditableFieldKey;
    optional?: boolean;
    masked?: boolean;
    helpText?: string;
  }> = [
    { icon: <User size={18} />, label: 'Name', value: user.name, key: 'name' },
    { icon: <Briefcase size={18} />, label: 'Occupation', value: user.occupation, key: 'occupation', optional: true },
    { icon: <Globe size={18} />, label: 'Country', value: `${user.countryFlag} ${user.country}`, key: 'country' },
    { icon: <MapPin size={18} />, label: 'Location', value: user.location, key: 'location', optional: true, helpText: 'Find local community groups and nearby mums' },
    { icon: <Mail size={18} />, label: 'Email', value: user.email, key: 'email', masked: true },
    { icon: <Phone size={18} />, label: 'Phone', value: user.phone, key: 'phone', masked: true },
  ];

  const stages: UserProfile['motherhoodStage'][] = [
    'Trying to Conceive', 'Pregnant', 'New Mum', 'Toddler Mum', 'Experienced Mum'
  ];

  const inputClassName =
    'w-full rounded-[var(--radius-sm)] border border-[var(--cream-dark)] bg-white px-3.5 py-2.5 text-sm font-medium text-[var(--text-primary)] outline-none transition-all duration-150 focus:border-[var(--blush-dark)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--blush)_45%,white)]';

  return (
    <div className="fade-in-up">
      <TabContent maxWidth="max-w-3xl">
      <ConfettiEffect trigger={showConfetti} />
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Progress Bar */}
      <Card className="mb-5" bodyClassName="px-5 py-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className={typo.subheading}>
            Your profile is {user.profileCompletion}% complete 🌸
          </span>
          <span className="text-xs font-semibold text-[var(--blush-dark)]">
            {user.profileCompletion}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-[var(--radius-full)] bg-[var(--cream-dark)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${user.profileCompletion}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-[var(--radius-full)] bg-[linear-gradient(90deg,var(--blush),var(--blush-dark))]"
          />
        </div>
      </Card>

      {/* Edit toggles */}
      <div className="mb-3 flex justify-end">
        {editing ? (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { setEditing(false); setEditData(user); }}
            >
              <X size={16} /> Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-[linear-gradient(135deg,var(--sage),var(--sage-dark))] hover:bg-[linear-gradient(135deg,var(--sage-dark),var(--sage-dark))]"
            >
              <Check size={16} /> Save
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing(true)}
          >
            Edit Info
          </Button>
        )}
      </div>

      {/* Motherhood Stage */}
      <Card className="mb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--blush-light)] text-[var(--blush-dark)]">
            <Clock size={18} />
          </div>
          <div className="min-w-0">
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
              <Badge label={`${user.motherhoodStage} · ${user.motherhoodMonths} months`} variant="blush" />
            )}
          </div>
        </div>
      </div>
      </Card>

      {/* Fields */}
      <AnimatePresence mode="wait">
        {fields.map((field, i) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="mb-2"
          >
            <Card
              density="compact"
              className="shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--cream-dark)] text-[var(--text-muted)]">
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
                        placeholder={field.optional ? `Add ${field.label.toLowerCase()} +` : ''}
                        className={inputClassName}
                      />
                    </FormField>
                  ) : (
                    <>
                      <FieldLabel>{field.label}</FieldLabel>
                      <div className={`mt-1 ${typo.fieldValue}`}>
                        {field.value || (
                          <span className="cursor-pointer italic text-[var(--blush-dark)]">
                            Add {field.label.toLowerCase()} +
                          </span>
                        )}
                        {field.masked && (
                          <span className={`ml-2 ${typo.caption}`}>🔒 Private</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Verification Status */}
      <Card className="mt-3" bodyClassName="px-5 py-4">
        <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)]"
          style={{
            background: user.verificationStatus === 'Verified' ? '#D4E8D0' : 'var(--cream-dark)',
            color: user.verificationStatus === 'Verified' ? '#2A6B2A' : 'var(--text-muted)',
          }}
        >
          {user.verificationStatus === 'Verified' ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
        </div>
        <div>
          <FieldLabel>ID Verification</FieldLabel>
          <Badge
            label={
              user.verificationStatus === 'Verified' ? 'Verified ✓' :
              user.verificationStatus === 'Pending' ? 'Pending ⏳' : 'Not Submitted'
            }
            variant={
              user.verificationStatus === 'Verified' ? 'success' :
              user.verificationStatus === 'Pending' ? 'warning' : 'cream'
            }
            size="sm"
          />
        </div>
      </div>
      </Card>
      </TabContent>
    </div>
  );
}
