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
    text: 'Don\'t forget to eat well yourself, mama! I prep overnight oats every evening — quick, nourishing, and I can eat them one-handed while feeding. Add berries and nuts for extra energy.',
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
    ],
    height: [
      { date: '2025-12', value: 50 },
      { date: '2026-01', value: 53 },
      { date: '2026-02', value: 56 },
      { date: '2026-03', value: 58 },
      { date: '2026-04', value: 61 },
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
