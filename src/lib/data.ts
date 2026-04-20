export interface UserProfile {
  name: string;
  avatar: string | null;
  motherhoodStage: 'Trying to Conceive' | 'Pregnant' | 'New Mum' | 'Toddler Mum' | 'Experienced Mum';
  motherhoodMonths: number;
  occupation: string;
  country: string;
  countryFlag: string;
  location: string;
  email: string;
  phone: string;
  isVerified: boolean;
  verificationStatus: 'Verified' | 'Pending' | 'Not Submitted';
  postsCount: number;
  tipsCount: number;
  childrenCount: number;
  profileCompletion: number;
}

export interface Post {
  id: string;
  thumbnail: string;
  caption: string;
  privacy: 'public' | 'private';
  createdAt: string;
}

export interface Tip {
  id: string;
  text: string;
  tags: TipTag[];
  helpfulPercent: number;
  upvotes: number;
  downvotes: number;
  date: string;
  views: number;
}

export type TipTag = 'Nutrition' | 'Sleep' | 'Mental Health' | 'Breastfeeding' | 'Postpartum';

export interface Child {
  id: string;
  name: string;
  photo: string | null;
  dateOfBirth: string;
  sex: 'Male' | 'Female' | 'Prefer not to say' | '';
  isPregnancy: boolean;
  dueDate?: string;
  publicFields: string[];
  weight: { date: string; value: number }[];
  height: { date: string; value: number }[];
  vaccinations: Vaccination[];
  milestones: Milestone[];
  photoTimeline: { date: string; photo: string; note: string }[];
  allergies: string[];
  medicalNotes: string;
}

export interface Vaccination {
  id: string;
  name: string;
  date: string | null;
  isDue: boolean;
  dueDate?: string;
}

export interface Milestone {
  id: string;
  label: string;
  achieved: boolean;
  achievedDate?: string;
}

export interface VaultDocument {
  id: string;
  name: string;
  category: string;
  owner: 'mother' | 'child';
  type: 'pdf' | 'image';
  size: string;
  date: string;
  note?: string;
  isOffline: boolean;
}

// ---------- MOCK DATA ----------

export const mockUser: UserProfile = {
  name: 'Sarah Thompson',
  avatar: null,
  motherhoodStage: 'New Mum',
  motherhoodMonths: 4,
  occupation: 'UX Designer',
  country: 'United Kingdom',
  countryFlag: '🇬🇧',
  location: 'London',
  email: 'sarah.t****@gmail.com',
  phone: '+44 •••• ••• 892',
  isVerified: true,
  verificationStatus: 'Verified',
  postsCount: 12,
  tipsCount: 5,
  childrenCount: 1,
  profileCompletion: 78,
};

export const mockPosts: Post[] = [
  { id: '1', thumbnail: '', caption: 'First smile captured! 💕 My heart is so full today.', privacy: 'public', createdAt: '2026-04-10' },
  { id: '2', thumbnail: '', caption: 'Bath time giggles 🛁', privacy: 'private', createdAt: '2026-04-08' },
  { id: '3', thumbnail: '', caption: 'Our morning walk routine 🌿', privacy: 'public', createdAt: '2026-04-05' },
  { id: '4', thumbnail: '', caption: 'Matching outfits day! 🎀', privacy: 'public', createdAt: '2026-04-02' },
  { id: '5', thumbnail: '', caption: 'Naptime peace ✨', privacy: 'private', createdAt: '2026-03-28' },
  { id: '6', thumbnail: '', caption: 'Tummy time champion 💪', privacy: 'public', createdAt: '2026-03-25' },
];

export const mockTips: Tip[] = [
  {
    id: '1',
    text: 'White noise really helped my little one sleep through the night. I use a fan on low setting — the consistent sound drowns out sudden noises that used to wake her up. Game changer for us after month three!',
    tags: ['Sleep'],
    helpfulPercent: 94,
    upvotes: 12,
    downvotes: 1,
    date: '2026-04-08',
    views: 89,
  },
  {
    id: '2',
    text: 'If breastfeeding feels overwhelming, try laid-back feeding positions. It was so much more comfortable for both of us and reduced the back pain I was getting from traditional holds.',
    tags: ['Breastfeeding', 'Postpartum'],
    helpfulPercent: 91,
    upvotes: 18,
    downvotes: 2,
    date: '2026-04-01',
    views: 134,
  },
  {
    id: '3',
    text: 'Don\'t forget to eat well yourself, mum! I prep overnight oats every evening — quick, nourishing, and I can eat them one-handed while feeding. Add berries and nuts for extra energy.',
    tags: ['Nutrition', 'Mental Health'],
    helpfulPercent: 88,
    upvotes: 9,
    downvotes: 1,
    date: '2026-03-20',
    views: 67,
  },
];

export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Olivia',
    photo: null,
    dateOfBirth: '2025-12-13',
    sex: 'Female',
    isPregnancy: false,
    publicFields: ['name', 'photo'],
    weight: [
      { date: '2025-12', value: 3.4 },
      { date: '2026-01', value: 4.1 },
      { date: '2026-02', value: 5.0 },
      { date: '2026-03', value: 5.7 },
      { date: '2026-04', value: 6.2 },
      { date: '2026-05', value: 6.8 },
      { date: '2026-06', value: 7.3 },
    ],
    height: [
      { date: '2025-12', value: 50 },
      { date: '2026-01', value: 53 },
      { date: '2026-02', value: 56 },
      { date: '2026-03', value: 58 },
      { date: '2026-04', value: 61 },
      { date: '2026-05', value: 63 },
      { date: '2026-06', value: 65 },
    ],
    photoTimeline: [
      { date: '2025-12', photo: '', note: 'First day home! 🏠' },
      { date: '2026-02', photo: '', note: 'First real smile. My heart! ❤️' },
      { date: '2026-04', photo: '', note: 'Tummy time champion! 💪' },
    ],
    vaccinations: [
      { id: 'v1', name: 'BCG', date: '2025-12-15', isDue: false },
      { id: 'v2', name: 'Hepatitis B (1st dose)', date: '2025-12-15', isDue: false },
      { id: 'v3', name: 'DTaP (1st dose)', date: '2026-02-13', isDue: false },
      { id: 'v4', name: 'Rotavirus (1st dose)', date: '2026-02-13', isDue: false },
      { id: 'v5', name: 'DTaP (2nd dose)', date: null, isDue: true, dueDate: '2026-04-13' },
      { id: 'v6', name: 'MMR (1st dose)', date: null, isDue: true, dueDate: '2026-12-13' },
    ],
    milestones: [
      { id: 'm1', label: 'First smile', achieved: true, achievedDate: '2026-02-10' },
      { id: 'm2', label: 'Holds head up', achieved: true, achievedDate: '2026-03-01' },
      { id: 'm3', label: 'Rolls over', achieved: true, achievedDate: '2026-04-05' },
      { id: 'm4', label: 'Sits without support', achieved: false },
      { id: 'm5', label: 'First words', achieved: false },
      { id: 'm6', label: 'Crawling', achieved: false },
      { id: 'm7', label: 'First steps', achieved: false },
    ],
    allergies: [],
    medicalNotes: 'No concerns at 4-month check-up. Growing well.',
  },
];

export const mockDocuments: VaultDocument[] = [
  { id: 'd1', name: 'Maternity Notes - NHS', category: 'Maternity Records', owner: 'mother', type: 'pdf', size: '2.4 MB', date: '2025-06-15', isOffline: true },
  { id: 'd2', name: 'Blood Test Results', category: 'Lab Reports', owner: 'mother', type: 'pdf', size: '890 KB', date: '2025-09-20', isOffline: false },
  { id: 'd3', name: 'Olivia Birth Certificate', category: 'Birth Certificate', owner: 'child', type: 'image', size: '1.8 MB', date: '2026-01-05', isOffline: true },
  { id: 'd4', name: 'Vaccination Card', category: 'Vaccination Records', owner: 'child', type: 'image', size: '1.2 MB', date: '2026-02-13', isOffline: false },
];

export const motherCategories = ['Maternity Records', 'Prescriptions', 'Lab Reports', 'Insurance', 'Postpartum Records', 'Other'];
export const childCategories = ['Birth Certificate', 'Vaccination Records', 'Growth Records', 'Lab Reports', 'Hospital Discharge', 'Insurance', 'Other'];

export const tipTagColors: Record<TipTag, string> = {
  'Nutrition': 'tag-nutrition',
  'Sleep': 'tag-sleep',
  'Mental Health': 'tag-mental-health',
  'Breastfeeding': 'tag-breastfeeding',
  'Postpartum': 'tag-postpartum',
};

/**
 * Calculates the profile completion percentage based on filled fields.
 */
export function calculateProfileCompletion(user: UserProfile): number {
  const criteria = [
    !!user.name.trim(),
    !!user.avatar,
    !!user.occupation.trim(),
    !!user.country.trim(),
    !!user.location.trim(),
    !!user.email.trim(),
    !!user.phone.trim(),
    !!user.motherhoodStage,
  ];

  const filledCount = criteria.filter(Boolean).length;
  return Math.round((filledCount / criteria.length) * 100);
}

export interface PrivacyLog {
  id: string;
  action: string;
  date: string;
  details: string;
}

export const mockPrivacyLogs: PrivacyLog[] = [
  { id: '1', action: 'Preset Applied', date: '2 days ago', details: 'Maximum Privacy mode activated' },
  { id: '2', action: 'Field Updated', date: '1 week ago', details: 'Child DOB set to private' },
  { id: '3', action: 'Access Granted', date: '2 weeks ago', details: 'Added 2 connections to "Trusted Circle"' },
];

export interface Connection {
  id: string;
  name: string;
  avatar: string | null;
  role: string;
}

export interface CommunityBadge {
  id: string;
  label: string;
  icon: string;
  desc: string;
  color: string;
}

export interface GratitudeMessage {
  id: string;
  from: string;
  text: string;
  date: string;
}

export const mockConnections: Connection[] = [
  { id: '1', name: 'Emma L.', avatar: null, role: 'New Mum' },
  { id: '2', name: 'Aria S.', avatar: null, role: 'Pregnant' },
  { id: '3', name: 'Sofia M.', avatar: null, role: 'Toddler Mum' },
  { id: '4', name: 'James W.', avatar: null, role: 'Dad' },
];

export const mockBadges: CommunityBadge[] = [
  { id: '1', label: 'Wisdom Sharer', icon: '🧠', desc: 'Shared 50+ helpful tips', color: 'var(--mauve)' },
  { id: '2', label: 'First Responder', icon: '🚑', desc: 'Supported 10+ mums in need', color: 'var(--sage)' },
  { id: '3', label: 'Supportive Sister', icon: '🤝', desc: 'Sent 100+ hugs & messages', color: 'var(--blush)' },
];

export const mockGratitude: GratitudeMessage[] = [
  { id: '1', from: 'Emma L.', text: 'Thanks Sarah! Your tip on sleep training was a lifesaver last night. ❤️', date: 'Yesterday' },
  { id: '2', from: 'Aria S.', text: 'So grateful for the hospital bag checklist you shared. Feeling prepared! 🌸', date: '3 days ago' },
];

export const mockCommunityTimeline = [
  { action: 'Joined Sleep Support Group', date: '3 months ago' },
  { action: 'Earned "Wisdom Sharer" Badge', date: '2 months ago' },
  { action: 'Reached 100 "Gratitude Hearts"', date: '1 month ago' },
];

export interface MoodEntry {
  id: string;
  emoji: string;
  label: string;
  date: string;
  note?: string;
}

export interface SelfCareGoal {
  id: string;
  label: string;
  completed: boolean;
}

export const mockMoods: MoodEntry[] = [
  { id: '1', emoji: '😊', label: 'Good', date: 'Today', note: 'Feeling rested after a full night!' },
  { id: '2', emoji: '😴', label: 'Tired', date: 'Yesterday' },
  { id: '3', emoji: '🤯', label: 'Overwhelmed', date: '2 days ago', note: 'Teething is hard.' },
];

export const mockSelfCare: SelfCareGoal[] = [
  { id: '1', label: 'Drink 2L of water', completed: true },
  { id: '2', label: 'Take a 5-minute breather', completed: false },
  { id: '3', label: 'Read 2 pages of a book', completed: false },
];

export type JourneyEventIconKind = 'calendar' | 'lightbulb' | 'baby' | 'heart';

export interface JourneyEvent {
  id: string;
  type: 'milestone' | 'post' | 'system';
  title: string;
  date: string;
  icon: JourneyEventIconKind;
}

export interface LegacyLetter {
  id: string;
  to: string;
  date: string;
  unlockDate: string;
  preview: string;
}

export const mockJourneyEvents: JourneyEvent[] = [
  { id: '1', type: 'system', title: 'Joined MummaElephant', date: '2025-06-15', icon: 'calendar' },
  { id: '2', type: 'post', title: 'Shared first tip on Sleep', date: '2025-08-10', icon: 'lightbulb' },
  { id: '3', type: 'milestone', title: 'Olivia Arrival!', date: '2025-12-13', icon: 'baby' },
  { id: '4', type: 'milestone', title: 'First 100 Hearts reached', date: '2026-02-20', icon: 'heart' },
];

export const mockHistoricalMemories = [
  { id: 'h1', photo: '', caption: 'Feeling so nervous but excited today. The nursery is finally ready!', date: '1 Year Ago Today' },
];

export const mockLegacyLetters: LegacyLetter[] = [
  { id: '1', to: 'Olivia', date: '2026-04-01', unlockDate: '2030-12-13', preview: 'Dear Olivia, today you took your first step...' },
];

export const mockGrowthComparison = {
  then: { date: 'Jan 2026', weight: 4.1, height: 53, photo: '' },
  now: { date: 'Apr 2026', weight: 6.2, height: 61, photo: '' },
};
