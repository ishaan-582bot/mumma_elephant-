'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, ThumbsUp, ThumbsDown, MoreHorizontal, X, Share2, Trash2, Info } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import BottomSheet from '../ui/BottomSheet';
import Toast from '../ui/Toast';
import HoldToDeleteButton from '../ui/HoldToDeleteButton';
import type { Tip, TipTag } from '@/lib/data';

const TAG_CLASSES: Record<TipTag, string> = {
  'Nutrition': 'tag-nutrition',
  'Sleep': 'tag-sleep',
  'Mental Health': 'tag-mental-health',
  'Breastfeeding': 'tag-breastfeeding',
  'Postpartum': 'tag-postpartum',
};

interface MyTipsProps {
  tips: Tip[];
}

export default function MyTips({ tips }: MyTipsProps) {
  const [expandedTip, setExpandedTip] = useState<Tip | null>(null);
  const [showNewTip, setShowNewTip] = useState(false);
  const [newTipText, setNewTipText] = useState('');
  const [newTipTags, setNewTipTags] = useState<TipTag[]>([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'default' as any });

  const allTags: TipTag[] = ['Nutrition', 'Sleep', 'Mental Health', 'Breastfeeding', 'Postpartum'];

  const toggleTag = (tag: TipTag) => {
    if (newTipTags.includes(tag)) {
      setNewTipTags(newTipTags.filter((t) => t !== tag));
    } else if (newTipTags.length < 3) {
      setNewTipTags([...newTipTags, tag]);
    }
  };

  if (tips.length === 0) {
    return (
      <EmptyState
        icon="💡"
        title="Your voice matters here, mum 💛"
        subtitle="Every mother's experience is valuable. Share what worked for you—it might be exactly what another mum needs to hear today."
        hint="Sharing your wisdom builds a supportive village for mums everywhere."
        action={{ label: 'Add Your First Tip', onClick: () => setShowNewTip(true) }}
      />
    );
  }

  return (
    <div className="fade-in-up" style={{ padding: '16px', maxWidth: 600, margin: '0 auto' }}>
      <Toast 
        message={toast.message} 
        show={toast.show} 
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })} 
      />
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {tips.length} tips shared
        </span>
        <button
          onClick={() => setShowNewTip(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--blush), var(--blush-dark))',
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            fontWeight: 700, color: 'white', fontSize: '0.85rem',
          }}
        >
          <Plus size={16} /> New Tip
        </button>
      </div>

      {/* Tip Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tips.map((tip, i) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setExpandedTip(tip)}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          >
            {/* Text excerpt */}
            <p style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 12,
            }}>
              {tip.text}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {tip.tags.map((tag) => (
                <span
                  key={tag}
                  className={TAG_CLASSES[tag]}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Relevance bar */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {tip.helpfulPercent > 0 ? `${tip.helpfulPercent}% found this helpful` : 'Be the first to rate this'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  👍 {tip.upvotes} · 👎 {tip.downvotes}
                </span>
              </div>
              <div style={{
                height: 5,
                background: 'var(--cream-dark)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${tip.helpfulPercent}%`,
                  background: 'linear-gradient(90deg, var(--sage), var(--sage-dark))',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tip.date}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Eye size={12} /> {tip.views} views
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Tip Sheet */}
      <BottomSheet
        isOpen={expandedTip !== null}
        onClose={() => setExpandedTip(null)}
        title="Tip Details"
      >
        {expandedTip && (
          <div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: 16 }}>
              {expandedTip.text}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {expandedTip.tags.map((tag) => (
                <span key={tag} className={TAG_CLASSES[tag]} style={{
                  padding: '4px 12px', borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem', fontWeight: 700,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Full relevance */}
            <div style={{
              background: 'var(--cream)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              marginBottom: 16,
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                Helpfulness
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--sage-dark)' }}>
                  <ThumbsUp size={16} /> <span style={{ fontWeight: 700 }}>{expandedTip.upvotes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--terracotta)' }}>
                  <ThumbsDown size={16} /> <span style={{ fontWeight: 700 }}>{expandedTip.downvotes}</span>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 'auto' }}>
                  {expandedTip.helpfulPercent}% helpful
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <button style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 'var(--radius-md)',
                background: 'var(--sage-light)', border: 'none',
                fontWeight: 700, fontSize: '0.85rem', color: '#4A6B3A',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <ThumbsUp size={16} /> Helpful
              </button>
              <button style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 'var(--radius-md)',
                background: 'var(--cream-dark)', border: 'none',
                fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-secondary)',
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Share2 size={16} /> Share
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 16 }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, textAlign: 'center' }}>
                Destructive Action
              </p>
              <HoldToDeleteButton 
                onConfirm={() => {
                  setExpandedTip(null);
                  setToast({ show: true, message: 'Your tip has been removed 🌿', type: 'info' });
                }}
                label="Hold to Delete Tip"
              />
            </div>
          </div>
        )}
      </BottomSheet>

      {/* New Tip Sheet */}
      <BottomSheet
        isOpen={showNewTip}
        onClose={() => { setShowNewTip(false); setNewTipText(''); setNewTipTags([]); }}
        title="Share a New Tip"
      >
        <div>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <textarea
              value={newTipText}
              onChange={(e) => { if (e.target.value.length <= 500) setNewTipText(e.target.value); }}
              placeholder="Share your wisdom with other mums... 🌸"
              style={{
                width: '100%', minHeight: 120, padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--cream-dark)',
                fontSize: '0.9rem', fontFamily: 'inherit',
                resize: 'vertical', background: 'var(--cream)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blush)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; }}
            />
            <span style={{
              position: 'absolute', bottom: 8, right: 12,
              fontSize: '0.75rem', fontWeight: 600,
              color: newTipText.length > 450 ? 'var(--terracotta)' : 'var(--text-muted)',
            }}>
              {newTipText.length}/500
            </span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Tags (up to 3)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }} title="Tags help other mums find your tip when they need it most.">
                <Info size={14} />
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.4 }}>
              Tags help other mums find your tip when they need it most. Choose up to 3 that best describe your advice.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {allTags.map((tag) => {
                const selected = newTipTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={selected ? TAG_CLASSES[tag] : ''}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      border: selected ? 'none' : '2px solid var(--cream-dark)',
                      background: selected ? undefined : 'transparent',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      color: selected ? undefined : 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            disabled={!newTipText.trim()}
            style={{
              width: '100%', padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: newTipText.trim()
                ? 'linear-gradient(135deg, var(--blush), var(--blush-dark))'
                : 'var(--cream-dark)',
              border: 'none',
              fontWeight: 700, fontSize: '0.95rem',
              color: newTipText.trim() ? 'white' : 'var(--text-muted)',
              cursor: newTipText.trim() ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
            }}
          >
            Publish Tip 🌸
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
