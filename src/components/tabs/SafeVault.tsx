'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, Unlock, FileText, Image, Upload, Download, Trash2,
  ChevronDown, ChevronUp, WifiOff, Plus, Eye, Search
} from 'lucide-react';
import PinPad from '../ui/PinPad';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import BottomSheet from '../ui/BottomSheet';
import { useToast } from '../ui/ToastContext';
import HoldToDeleteButton from '../ui/HoldToDeleteButton';
import Accordion from '../ui/Accordion';
import TabContent from '../ui/TabContent';
import Card from '../ui/Card';
import type { VaultDocument } from '@/lib/data';
import { motherCategories, childCategories } from '@/lib/data';
import { typo } from '@/lib/typography';

interface SafeVaultProps {
  documents: VaultDocument[];
}

export default function SafeVault({ documents }: SafeVaultProps) {
  const [isLocked, setIsLocked] = useState(true);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [setupPin, setSetupPin] = useState<string | null>(null);
  const [pinError, setPinError] = useState('');
  const [expandedSection, setExpandedSection] = useState<'mother' | 'child' | null>('mother');
  const [showUpload, setShowUpload] = useState(false);
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<VaultDocument | null>(null);
  const { showToast } = useToast();
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Check for existing PIN on mount
  useEffect(() => {
    const storedPin = localStorage.getItem('mumma_vault_pin');
    if (!storedPin) {
      setIsSetupMode(true);
    }
  }, []);

  // Auto-lock after 5 min of inactivity
  useEffect(() => {
    if (isLocked) return;
    
    const timer = setTimeout(() => {
      setIsLocked(true);
    }, 5 * 60 * 1000); // 5 minutes
    
    return () => clearTimeout(timer);
  }, [isLocked, lastActivity]);

  const handleActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  const handlePinSubmit = (pin: string) => {
    if (isSetupMode) {
      handleSetupPin(pin);
    } else {
      // Standard unlock mode
      const storedPin = localStorage.getItem('mumma_vault_pin');
      if (pin === storedPin) {
        setIsLocked(false);
        showToast('Upload successful! Document added to your vault.', 'success');
        setLastActivity(Date.now());
      } else {
        setPinError('Incorrect PIN, please try again');
        showToast('Access denied: Incorrect PIN', 'error');
      }
    }
  };

  const handleSetupPin = (pin: string) => {
    if (pin.length < 4) return;
    if (!setupPin) {
      setSetupPin(pin);
      showToast('Now, confirm your PIN', 'info');
    } else {
      if (pin === setupPin) {
        localStorage.setItem('mumma_vault_pin', pin);
        setIsSetupMode(false);
        setIsLocked(false);
        showToast('Document deleted permanently.', 'success');
      } else {
        setPinError('PINs do not match. Start again.');
        setSetupPin(null);
        showToast('Setup failed: PINs do not match', 'warning');
      }
    }
  };

  const motherDocs = documents.filter((d) => d.owner === 'mother');
  const childDocs = documents.filter((d) => d.owner === 'child');

  // Lock Screen
  if (isLocked) {
    return (
      <div className="fade-in-up">
        <TabContent>
          <div className="flex flex-col items-center min-h-[400px]">
            {/* Padlock Illustration */}
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--mauve-light)] to-[var(--lavender-light)] shadow-[0_0_30px_rgba(201,169,199,0.4)]">
              <Lock size={40} className="text-[var(--mauve)]" strokeWidth={1.75} />
            </div>

            <h2 className={`${typo.pageHeroBold} mb-2 text-center`}>
              {isSetupMode ? (setupPin ? 'Confirm your PIN' : 'Create your Vault PIN') : 'Your Safe Vault'}
            </h2>
            <p className={`${typo.bodyMuted} mx-auto mb-8 max-w-xs text-center`}>
              {isSetupMode 
                ? 'Set a 4-digit PIN to keep your documents safe and private.' 
                : 'Enter your PIN to access your documents. Everything here stays private and secure.'}
            </p>

            <PinPad
              onComplete={handlePinSubmit}
              error={pinError}
            />
          </div>
        </TabContent>
      </div>
    );
  }

  // Unlocked Vault
  return (
    <div className="fade-in-up" onClick={handleActivity}>
      <TabContent>

      {/* Welcome header */}
      <Card 
        className="mb-4 transition-shadow duration-200 border-l-4 border-l-[var(--mauve)]"
        bodyClassName="px-5 py-4 flex items-center gap-3"
      >
        <Unlock size={24} className="shrink-0 text-[var(--mauve)]" strokeWidth={2} aria-hidden />
        <div className="min-w-0 flex-1">
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Welcome back, your documents are safe here
          </span>
          <div className={`mt-0.5 ${typo.caption} text-[var(--text-secondary)]`}>
            {documents.length} document{documents.length !== 1 ? 's' : ''} stored
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsLocked(true);
            showToast(
              'Upload cancelled',
              'default',
              5000,
              {
                label: 'Retry',
                onClick: () => setShowUpload(true)
              }
            );
          }}
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-full)] border-none bg-[var(--cream)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--cream-dark)]"
          aria-label="Lock vault"
        >
          <Lock size={16} />
        </button>
      </Card>

      {/* Tabs */}
      {documents.length === 0 ? (
        <EmptyState
          icon={<FileText size={48} color="var(--mauve)" strokeWidth={1.5} />}
          title="Your vault is ready"
          subtitle="Add your first document to keep it safe 🔐. You can store maternity records, vaccination cards, lab reports, and more. Everything is encrypted and only visible to you."
          action={{ label: "Upload First Document", onClick: () => setShowUpload(true) }}
          hint="Bank-level encryption"
          hintIcon={<Lock size={16} color="var(--mauve)" strokeWidth={2} className="shrink-0" />}
        />
      ) : (
        <>
          {/* Mother's Documents */}
          <div className="mb-3">
            <Accordion
              title="👩 Mother's Documents"
              badge={<Badge label={`${motherDocs.length}`} variant="mauve" size="sm" />}
              isOpen={expandedSection === 'mother'}
              onToggle={() => setExpandedSection(expandedSection === 'mother' ? null : 'mother')}
            >
              {motherDocs.length === 0 ? (
                <div className="pt-2">
                  <p className={`pb-2 italic ${typo.bodyMuted}`}>
                    No documents yet. Add one so it's always within reach 📋
                  </p>
                </div>
              ) : (
                <div className="pt-4">
                  {motherDocs.map((doc, i) => (
                    <DocumentCard key={doc.id} doc={doc} index={i} onPreview={setPreviewDoc} onDelete={setShowDelete} />
                  ))}
                </div>
              )}
            </Accordion>
          </div>

          {/* Child's Documents */}
          <div className="mb-3">
            <Accordion
              title="👶 Child's Documents"
              badge={<Badge label={`${childDocs.length}`} variant="blush" size="sm" />}
              isOpen={expandedSection === 'child'}
              onToggle={() => setExpandedSection(expandedSection === 'child' ? null : 'child')}
            >
              {childDocs.length === 0 ? (
                <div className="pt-2">
                  <p className={`pb-2 italic ${typo.bodyMuted}`}>
                    No documents yet. Add one so it's always within reach 📋
                  </p>
                </div>
              ) : (
                <div className="pt-4">
                  {childDocs.map((doc, i) => (
                    <DocumentCard key={doc.id} doc={doc} index={i} onPreview={setPreviewDoc} onDelete={setShowDelete} />
                  ))}
                </div>
              )}
            </Accordion>
          </div>
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowUpload(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-gradient-to-br from-[var(--mauve)] to-[var(--lavender)] text-white shadow-[var(--shadow-lg)]"
      >
        <Upload size={22} />
      </motion.button>

      {/* Upload Sheet */}
      <BottomSheet isOpen={showUpload} onClose={() => setShowUpload(false)} title="Upload Document">
        <div>
          <p className={`mb-4 ${typo.bodyMuted}`}>
            Choose a category, then pick your file 🌸
          </p>
          <div className="mb-4">
            <p className={`${typo.subheading} mb-2 text-[var(--text-primary)]`}>Mother&apos;s Documents</p>
            <div className="flex flex-wrap gap-2">
              {motherCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setShowUpload(false); showToast(`Ready to upload to "${cat}" 📁`, 'info'); }}
                  className="rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-transparent px-3.5 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-150 hover:border-[var(--mauve)] hover:bg-[var(--mauve-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blush)] active:scale-95"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`${typo.subheading} mb-2 text-[var(--text-primary)]`}>Child&apos;s Documents</p>
            <div className="flex flex-wrap gap-2">
              {childCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setShowUpload(false); showToast(`Ready to upload to "${cat}" 📁`, 'info'); }}
                  className="rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-transparent px-3.5 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-150 hover:border-[var(--blush)] hover:bg-[var(--blush-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blush)] active:scale-95"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>

      {/* Delete Confirmation */}
      <BottomSheet isOpen={showDelete !== null} onClose={() => setShowDelete(null)} title="Delete Document">
        <div className="px-1 py-4 text-center">
          <p className={`${typo.subheading} mb-2 text-[var(--text-primary)]`}>
            Are you sure you want to delete this?
          </p>
          <p className={`${typo.caption} mb-6`}>
            This cannot be undone. Hold the button to confirm.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowDelete(null)}
              className="flex-1 cursor-pointer rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-transparent py-3 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card-hover)]"
            >
              Keep It
            </button>
            <HoldToDeleteButton 
              onConfirm={() => { setShowDelete(null); showToast('Document moved to trash. Undo?', 'warning'); }} 
              label="Hold to Delete"
            />
          </div>
        </div>
      </BottomSheet>

      {/* Document Preview */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-black/90 p-6"
            onClick={() => setPreviewDoc(null)}
          >
            <div 
              className="w-[90vw] max-w-[400px] rounded-[var(--radius-xl)] bg-[var(--bg-card)] p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 text-[64px]">
                {previewDoc.type === 'pdf' ? '📄' : '🖼️'}
              </div>
              <h3 className={`${typo.heading} mb-2 text-lg`}>
                {previewDoc.name}
              </h3>
              <Badge label={previewDoc.category} variant="mauve" />
              <div className={`${typo.caption} mt-4`}>
                {previewDoc.size} • {previewDoc.date}
              </div>
              <div className="mt-6 flex justify-center gap-3">
                <button type="button" className="flex cursor-pointer items-center gap-2 rounded-[var(--radius-md)] border-none bg-[var(--sage-light)] px-5 py-2.5 text-sm font-semibold text-[#4A6B3A] transition-all hover:bg-[var(--sage)] hover:text-white">
                  <Download size={16} /> Download
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="cursor-pointer rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-transparent px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--mauve)] hover:text-[var(--mauve-dark)]"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </TabContent>
    </div>
  );
}

// Document Card sub-component
function DocumentCard({
  doc,
  index = 0,
  onPreview,
  onDelete,
}: {
  doc: VaultDocument;
  index?: number;
  onPreview: (doc: VaultDocument) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-md)' }}
      whileTap={{ scale: 0.98 }}
      className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--cream-dark)] bg-[var(--bg-card)] px-4 py-3 shadow-[var(--shadow-sm)] transition-all duration-150"
      onClick={() => onPreview(doc)}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] ${
        doc.type === 'pdf' ? 'bg-[var(--terracotta-light)]' : 'bg-[var(--sky-blue-light)]'
      }`}>
        {doc.type === 'pdf' ? <FileText size={18} className="text-[#7A4A3A]" /> : <Image size={18} className="text-[#3A5A7A]" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className={`truncate ${typo.body}`}>
          {doc.name}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className={typo.caption}>{doc.category}</span>
          <span className={typo.caption}>•</span>
          <span className={typo.caption}>{doc.size}</span>
          {doc.isOffline && (
            <span className={`flex items-center gap-0.5 font-semibold text-[var(--sage-dark)] ${typo.caption}`}>
              <WifiOff size={10} /> Offline
            </span>
          )}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }}
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[var(--text-muted)] transition-colors hover:bg-[var(--terracotta-light)] hover:text-[var(--terracotta)]"
        aria-label="Delete document"
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
}
