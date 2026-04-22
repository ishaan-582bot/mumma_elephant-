'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, ThumbsUp, ThumbsDown, Share2, Info } from 'lucide-react';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import BottomSheet from '../ui/BottomSheet';
import { useToast } from '../ui/ToastContext';
import HoldToDeleteButton from '../ui/HoldToDeleteButton';
import TabContent, { tabViewVariants } from '../ui/TabContent';
import type { Tip, TipTag } from '@/lib/data';
import { typo } from '@/lib/typography';
import Button from '../ui/Button';

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
      <motion.div variants={tabViewVariants.item} className="mb-4 flex items-center justify-between px-1">
        <span className={`${typo.subheading} font-semibold`}>
          {tips.length} tips shared
        </span>
        <button
          type="button"
          className="group flex cursor-pointer items-center gap-1.5 rounded-[var(--radius-md)] border-none bg-[linear-gradient(135deg,var(--blush),var(--blush-dark))] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
          onClick={() => setShowNewTip(true)}
        >
          <Plus size={16} className="transition-transform group-hover:rotate-90" /> New Tip
        </button>
      </motion.div>

      {/* Tip Cards */}
      <motion.div variants={tabViewVariants.item} className="flex flex-col gap-3">
        {tips.map((tip) => (
          <motion.div
            key={tip.id}
            whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setExpandedTip(tip)}
            className="cursor-pointer rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-md)] transition-all duration-300"
          >
            {/* Text excerpt */}
            <p className={`mb-4 line-clamp-3 ${typo.body} italic leading-relaxed`}>
              &quot;{tip.text}&quot;
            </p>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {tip.tags.map((tag) => (
                <span
                  key={tag}
                  className={`${TAG_CLASSES[tag]} rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Relevance bar */}
            <div className="mb-4 rounded-[var(--radius-md)] border border-[var(--cream-dark)] bg-[var(--bg-primary)] p-3 shadow-inner">
              <div className="mb-1.5 flex items-center justify-between">
                <span className={`${typo.caption} font-bold text-[var(--text-secondary)]`}>
                  {tip.helpfulPercent > 0 ? `${tip.helpfulPercent}% helpful` : 'New Tip'}
                </span>
                <span className={`${typo.caption} font-semibold`}>
                  👍 {tip.upvotes} · 👎 {tip.downvotes}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--cream-dark)]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${tip.helpfulPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--sage),var(--sage-dark))]"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-dashed border-[var(--cream-dark)] pt-3">
              <span className={`italic ${typo.caption}`}>{tip.date}</span>
              <span className={`flex items-center gap-1 font-semibold ${typo.caption}`}>
                <Eye size={12} className="text-[var(--mauve)]" /> {tip.views} views
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded Tip Sheet */}
      <BottomSheet
        isOpen={expandedTip !== null}
        onClose={() => setExpandedTip(null)}
        title="Your Wisdom"
      >
        {expandedTip && (
          <div className="flex flex-col gap-4">
            <p className={`${typo.body} italic leading-relaxed text-[var(--text-primary)]/90`}>
              &quot;{expandedTip.text}&quot;
            </p>
            
            <div className="flex flex-wrap gap-2">
              {expandedTip.tags.map((tag) => (
                <span key={tag} className={`${TAG_CLASSES[tag]} rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider`}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Helpfulness Metrics */}
            <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--cream-dark)] bg-[var(--cream)] p-4 shadow-inner">
               <h4 className={`font-bold ${typo.subheading}`}>Community Sentiment</h4>
               <div className="flex items-center gap-6">
                 <div className="flex items-center gap-1.5 text-[var(--sage-dark)]">
                   <ThumbsUp size={18} strokeWidth={2.5} />
                   <span className="text-sm font-extrabold">{expandedTip.upvotes}</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-[var(--terracotta)]">
                   <ThumbsDown size={18} strokeWidth={2.5} />
                   <span className="text-sm font-extrabold">{expandedTip.downvotes}</span>
                 </div>
                 <Badge label={`${expandedTip.helpfulPercent}% Positive`} variant="sage" size="sm" className="ml-auto" />
               </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="bg-[var(--sage-light)] text-[var(--sage-dark)] border-none">
                <ThumbsUp size={18} /> Helpful
              </Button>
              <Button variant="secondary" className="bg-[var(--cream-dark)] text-[var(--text-secondary)] border-none">
                <Share2 size={18} /> Share
              </Button>
            </div>

            <div className="mt-2 border-t border-dashed border-[var(--cream-dark)] pt-5">
              <p className={`mb-3 text-center font-bold text-[var(--text-muted)] ${typo.caption} uppercase tracking-widest`}>
                Manage Entry
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
        title="Share Wisdom"
      >
        <div className="flex flex-col gap-5">
          <div className="relative">
            <textarea
              value={newTipText}
              onChange={(e) => { if (e.target.value.length <= 500) setNewTipText(e.target.value); }}
              placeholder="Share what worked for you... 🌸"
              className="min-h-[160px] w-full resize-none rounded-[var(--radius-lg)] border-2 border-[var(--cream-dark)] bg-[var(--bg-primary)] px-4 py-4 text-sm font-bold leading-relaxed text-[var(--text-primary)] outline-none transition-all focus:border-[var(--blush)] focus:shadow-[var(--shadow-glow-blush)]"
            />
            <span className={`absolute bottom-3 right-4 text-[10px] font-extrabold tracking-wider ${newTipText.length > 450 ? 'text-[var(--terracotta)]' : 'text-[var(--text-muted)]'}`}
            >
              {newTipText.length} / 500
            </span>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2">
              <h4 className={`font-bold ${typo.subheading}`}>Categorize it (Max 3)</h4>
              <Info size={14} className="text-[var(--text-muted)]" />
            </div>
            <p className={`mb-3 italic ${typo.caption} leading-tight`}>
              Tags help other mums find your advice when they search for specific support areas.
            </p>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const selected = newTipTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`cursor-pointer rounded-full border-2 px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                      selected 
                        ? TAG_CLASSES[tag] + ' border-transparent scale-105 shadow-sm' 
                        : 'border-[var(--cream-dark)] bg-transparent text-[var(--text-muted)] hover:border-[var(--mauve-light)]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            disabled={!newTipText.trim()}
            onClick={() => {
              setShowNewTip(false);
              showToast('Your tip is live! Mums can now find your wisdom. ✨', 'success');
              setNewTipText('');
              setNewTipTags([]);
            }}
            className="mt-2"
          >
            Publish to Community 🌸
          </Button>
        </div>
      </BottomSheet>
      </TabContent>
    </div>
  );
}
