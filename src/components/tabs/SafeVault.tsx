'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, FileText, Image, Upload, Download, Trash2,
  ChevronDown, ChevronUp, WifiOff, Plus, Eye, Search
} from 'lucide-react';
import PinPad from '../ui/PinPad';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import BottomSheet from '../ui/BottomSheet';
import Toast from '../ui/Toast';
import HoldToDeleteButton from '../ui/HoldToDeleteButton';
import type { VaultDocument } from '@/lib/data';
import { motherCategories, childCategories } from '@/lib/data';

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
  const [toast, setToast] = useState({ 
    show: false, 
    message: '', 
    type: 'default' as 'success' | 'warning' | 'info' | 'error' | 'default' 
  });
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
        setToast({ show: true, message: 'Vault unlocked 🔓', type: 'success' });
        setLastActivity(Date.now());
      } else {
        setPinError('Incorrect PIN, please try again');
        setToast({ show: true, message: 'Access denied: Incorrect PIN', type: 'error' });
      }
    }
  };

  const handleSetupPin = (pin: string) => {
    if (pin.length < 4) return;
    if (!setupPin) {
      setSetupPin(pin);
      setToast({ show: true, message: 'Now, confirm your PIN', type: 'info' });
    } else {
      if (pin === setupPin) {
        localStorage.setItem('mumma_vault_pin', pin);
        setIsSetupMode(false);
        setIsLocked(false);
        setToast({ show: true, message: 'Vault PIN secured! 🐘🌿', type: 'success' });
      } else {
        setPinError('PINs do not match. Start again.');
        setSetupPin(null);
        setToast({ show: true, message: 'Setup failed: PINs do not match', type: 'warning' });
      }
    }
  };

  const motherDocs = documents.filter((d) => d.owner === 'mother');
  const childDocs = documents.filter((d) => d.owner === 'child');

  // Lock Screen
  if (isLocked) {
    return (
      <div className="fade-in-up" style={{
        padding: '48px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 400,
      }}>
        {/* Padlock Illustration */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--mauve-light), var(--lavender-light))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
          marginBottom: 24,
          boxShadow: '0 0 30px rgba(201, 169, 199, 0.4)',
        }}>
          🔐
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, textAlign: 'center' }}>
          {isSetupMode ? (setupPin ? 'Confirm your PIN' : 'Create your Vault PIN') : 'Your Safe Vault'}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: 260, marginBottom: 24 }}>
          {isSetupMode 
            ? 'Set a 4-digit PIN to keep your documents safe and private. 🌿' 
            : 'Enter your PIN to access your documents. Everything here stays private and secure.'}
        </p>

        <PinPad
          onComplete={handlePinSubmit}
          error={pinError}
        />
      </div>
    );
  }

  // Unlocked Vault
  return (
    <div
      className="fade-in-up"
      onClick={handleActivity}
      style={{ padding: '16px', maxWidth: 600, margin: '0 auto' }}
    >
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />

      {/* Welcome header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--mauve-light), var(--lavender-light))',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 28 }}>🔓</span>
        <div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Welcome back, your documents are safe here
          </span>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            {documents.length} document{documents.length !== 1 ? 's' : ''} stored
          </div>
        </div>
        <button
          onClick={() => setIsLocked(true)}
          style={{
            marginLeft: 'auto', width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)',
          }}
        >
          <Lock size={16} />
        </button>
      </div>

      {documents.length === 0 ? (
        <EmptyState
          icon="📦"
          title="Your vault is ready"
          subtitle="Add your first document to keep it safe 🔐"
          action={{ label: "Add My Document", onClick: () => setShowUpload(true) }}
          secondaryAction={{ label: "Add Child's Document", onClick: () => setShowUpload(true) }}
        />
      ) : (
        <>
          {/* Mother's Documents */}
          <div style={{ marginBottom: 12 }}>
            <button
              onClick={() => setExpandedSection(expandedSection === 'mother' ? null : 'mother')}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                borderRadius: expandedSection === 'mother' ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
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
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                👩 Mother&apos;s Documents
                <Badge label={`${motherDocs.length}`} variant="mauve" size="sm" />
              </span>
              {expandedSection === 'mother' ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
            </button>

            <AnimatePresence>
              {expandedSection === 'mother' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ padding: '0 16px 16px' }}>
                    {motherDocs.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '12px 0' }}>
                        No documents yet. Add one so it&apos;s always within reach 📋
                      </p>
                    ) : (
                      motherDocs.map((doc) => (
                        <DocumentCard key={doc.id} doc={doc} onPreview={setPreviewDoc} onDelete={setShowDelete} />
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Child's Documents */}
          <div style={{ marginBottom: 12 }}>
            <button
              onClick={() => setExpandedSection(expandedSection === 'child' ? null : 'child')}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                borderRadius: expandedSection === 'child' ? 'var(--radius-lg) var(--radius-lg) 0 0' : 'var(--radius-lg)',
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
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                👶 Child&apos;s Documents
                <Badge label={`${childDocs.length}`} variant="blush" size="sm" />
              </span>
              {expandedSection === 'child' ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
            </button>

            <AnimatePresence>
              {expandedSection === 'child' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ padding: '0 16px 16px' }}>
                    {childDocs.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '12px 0' }}>
                        No documents yet. Add one so it&apos;s always within reach 📋
                      </p>
                    ) : (
                      childDocs.map((doc) => (
                        <DocumentCard key={doc.id} doc={doc} onPreview={setPreviewDoc} onDelete={setShowDelete} />
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Upload FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowUpload(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--mauve), var(--lavender))',
          border: 'none',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          zIndex: 50,
        }}
      >
        <Upload size={22} />
      </motion.button>

      {/* Upload Sheet */}
      <BottomSheet isOpen={showUpload} onClose={() => setShowUpload(false)} title="Upload Document">
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Choose a category, then pick your file 🌸
          </p>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Mother&apos;s Documents</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {motherCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setShowUpload(false); setToast({ show: true, message: `Ready to upload to "${cat}" 📁`, type: 'info' }); }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--cream-dark)',
                    background: 'transparent',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--mauve)'; e.currentTarget.style.background = 'var(--mauve-light)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Child&apos;s Documents</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {childCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setShowUpload(false); setToast({ show: true, message: `Ready to upload to "${cat}" 📁`, type: 'info' }); }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--cream-dark)',
                    background: 'transparent',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--blush)'; e.currentTarget.style.background = 'var(--blush-light)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; e.currentTarget.style.background = 'transparent'; }}
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
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <p style={{ fontSize: '1rem', marginBottom: 8, color: 'var(--text-primary)' }}>
            Are you sure you want to delete this?
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 20 }}>
            It will be kept for 30 days before permanent deletion.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setShowDelete(null)}
              style={{
                flex: 1, padding: '12px', borderRadius: 'var(--radius-md)',
                border: '2px solid var(--cream-dark)', background: 'transparent',
                fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-secondary)',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Keep It
            </button>
            <HoldToDeleteButton 
              onConfirm={() => { setShowDelete(null); setToast({ show: true, message: 'Document moved to trash. Undo?', type: 'warning' }); }} 
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
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(30, 20, 15, 0.92)',
              zIndex: 5000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
            onClick={() => setPreviewDoc(null)}
          >
            <div style={{
              width: '90vw',
              maxWidth: 400,
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 32,
              textAlign: 'center',
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>
                {previewDoc.type === 'pdf' ? '📄' : '🖼️'}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                {previewDoc.name}
              </h3>
              <Badge label={previewDoc.category} variant="mauve" />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 12 }}>
                {previewDoc.size} · {previewDoc.date}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', borderRadius: 'var(--radius-md)',
                  background: 'var(--sage-light)', border: 'none',
                  fontWeight: 700, fontSize: '0.85rem', color: '#4A6B3A',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <Download size={16} /> Download
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  style={{
                    padding: '10px 20px', borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--cream-dark)', background: 'transparent',
                    fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Document Card sub-component
function DocumentCard({
  doc,
  onPreview,
  onDelete,
}: {
  doc: VaultDocument;
  onPreview: (doc: VaultDocument) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 0',
        borderBottom: '1px solid var(--cream-dark)',
        cursor: 'pointer',
      }}
      onClick={() => onPreview(doc)}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 'var(--radius-sm)',
        background: doc.type === 'pdf' ? 'var(--terracotta-light)' : 'var(--sky-blue-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {doc.type === 'pdf' ? <FileText size={18} color="#7A4A3A" /> : <Image size={18} color="#3A5A7A" />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {doc.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.category}</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>·</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.size}</span>
          {doc.isOffline && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.65rem', color: 'var(--sage-dark)', fontWeight: 700 }}>
              <WifiOff size={10} /> Offline
            </span>
          )}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }}
        style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-muted)',
        }}
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
}
