'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, ThumbsUp, ThumbsDown, MoreHorizontal, X, Share2, Trash2, Info } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import BottomSheet from '../ui/BottomSheet';
import { useToast } from '../ui/ToastContext';
import HoldToDeleteButton from '../ui/HoldToDeleteButton';
import TabContent from '../ui/TabContent';
import type { Tip, TipTag } from '@/lib/data';
import { typo } from '@/lib/typography';

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
  const { showToast } = useToast();

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
    <div className="fade-in-up">
      <TabContent>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span className={typo.subheading}>
          {tips.length} tips shared
        </span>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-[var(--radius-md)] border-none bg-[linear-gradient(135deg,var(--blush),var(--blush-dark))] px-4 py-2 text-sm font-semibold text-white"
          onClick={() => setShowNewTip(true)}
          style={{ cursor: 'pointer', fontFamily: 'inherit' }}
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
              padding: '20px',
              boxShadow: 'var(--shadow-md)',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          >
            {/* Text excerpt */}
            <p
              className={`mb-3 line-clamp-3 ${typo.body}`}
            >
              {tip.text}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              {tip.tags.map((tag) => (
                <span
                  key={tag}
                  className={`${TAG_CLASSES[tag]} px-2.5 py-0.5 text-xs font-semibold`}
                  style={{
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Relevance bar */}
            <div
              style={{
                marginBottom: 10,
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span className={`${typo.caption} font-semibold text-[var(--text-secondary)]`}>
                  {tip.helpfulPercent > 0 ? `${tip.helpfulPercent}% found this helpful` : 'Be the first to rate this'}
                </span>
                <span className={typo.caption}>
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
              <span className={typo.caption}>{tip.date}</span>
              <span className={`flex items-center gap-1 ${typo.caption}`}>
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
            <p className={`mb-4 ${typo.body}`}>
              {expandedTip.text}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {expandedTip.tags.map((tag) => (
                <span key={tag} className={`${TAG_CLASSES[tag]} px-3 py-1 text-xs font-semibold`} style={{
                  borderRadius: 'var(--radius-full)',
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
              <div className={`mb-2 ${typo.subheading}`}>
                Helpfulness
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--sage-dark)' }}>
                  <ThumbsUp size={16} /> <span style={{ fontWeight: 700 }}>{expandedTip.upvotes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--terracotta)' }}>
                  <ThumbsDown size={16} /> <span style={{ fontWeight: 700 }}>{expandedTip.downvotes}</span>
                </div>
                <span className={`ml-auto ${typo.subheading}`}>
                  {expandedTip.helpfulPercent}% helpful
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <button type="button" className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--radius-md)] border-none bg-[var(--sage-light)] py-3 text-sm font-semibold text-[#4A6B3A]" style={{ fontFamily: 'inherit' }}>
                <ThumbsUp size={16} /> Helpful
              </button>
              <button type="button" className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[var(--radius-md)] border-none bg-[var(--cream-dark)] py-3 text-sm font-semibold text-[var(--text-secondary)]" style={{ fontFamily: 'inherit' }}
              >
                <Share2 size={16} /> Share
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 16 }}>
              <p className={`mb-3 text-center ${typo.caption}`}>
                Destructive Action
              </p>
              <HoldToDeleteButton 
                onConfirm={() => {
                  setExpandedTip(null);
                  showToast('Your tip has been removed 🌿', 'info');
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
              className="min-h-[120px] w-full resize-y rounded-[var(--radius-md)] border-2 border-[var(--cream-dark)] bg-[var(--cream)] px-3.5 py-3.5 text-sm font-medium leading-relaxed text-[var(--text-primary)] outline-none"
              style={{ fontFamily: 'inherit' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--blush)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; }}
            />
            <span className={`absolute bottom-2 right-3 text-xs font-semibold ${newTipText.length > 450 ? 'text-[var(--terracotta)]' : 'text-[var(--text-muted)]'}`}
            >
              {newTipText.length}/500
            </span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <p className={`${typo.subheading}`}>
                Tags (up to 3)
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)' }} title="Tags help other mums find your tip when they need it most.">
                <Info size={14} />
              </div>
            </div>
            <p className={`mb-3 ${typo.caption}`}>
              Tags help other mums find your tip when they need it most. Choose up to 3 that best describe your advice.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {allTags.map((tag) => {
                const selected = newTipTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${selected ? TAG_CLASSES[tag] : 'border-2 border-[var(--cream-dark)] bg-transparent text-[var(--text-muted)]'}`}
                    style={{
                      fontFamily: 'inherit',
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            disabled={!newTipText.trim()}
            className="w-full rounded-[var(--radius-md)] border-none py-3.5 text-base font-semibold disabled:cursor-not-allowed"
            style={{
              background: newTipText.trim()
                ? 'linear-gradient(135deg, var(--blush), var(--blush-dark))'
                : 'var(--cream-dark)',
              color: newTipText.trim() ? 'white' : 'var(--text-muted)',
              cursor: newTipText.trim() ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
            }}
          >
            Publish Tip 🌸
          </button>
        </div>
      </BottomSheet>
      </TabContent>
    </div>
  );
}
