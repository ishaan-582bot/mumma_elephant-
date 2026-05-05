import { z } from 'zod';

// Re-export core types from data.ts for backend usage and Zod validation

// Enums as Zod literals
export const MotherhoodStage = z.enum([
  'Trying to Conceive',
  'Pregnant',
  'New Mum',
  'Toddler Mum',
  'Experienced Mum',
]);

export const VerificationStatus = z.enum(['Verified', 'Pending', 'Not Submitted']);
export const PrivacyLevel = z.enum(['public', 'private']);
export const TipTag = z.enum(['Nutrition', 'Sleep', 'Mental Health', 'Breastfeeding', 'Postpartum']);
export const Sex = z.enum(['Male', 'Female', 'Prefer not to say', '']);
export const OwnerType = z.enum(['mother', 'child']);
export const DocumentType = z.enum(['pdf', 'image']);
export const ConnectionStatus = z.enum(['pending', 'accepted', 'declined']);
export const JourneyEventIcon = z.enum(['calendar', 'lightbulb', 'baby', 'heart']);
export const JourneyEventType = z.enum(['milestone', 'post', 'system']);

// Auth schemas
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).max(100),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// User Profile
export const UserProfileUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  avatar: z.string().nullable().optional(),
  motherhoodStage: MotherhoodStage.optional(),
  motherhoodMonths: z.number().int().min(0).optional(),
  occupation: z.string().optional(),
  country: z.string().optional(),
  countryFlag: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  isVerified: z.boolean().optional(),
  verificationStatus: VerificationStatus.optional(),
  onboardingDone: z.boolean().optional(),
});

// Post schemas
export const PostCreateSchema = z.object({
  caption: z.string().min(1).max(1000),
  privacy: PrivacyLevel.default('public'),
  thumbnail: z.string().optional(),
});

export const PostUpdateSchema = z.object({
  caption: z.string().min(1).max(1000).optional(),
  privacy: PrivacyLevel.optional(),
  thumbnail: z.string().optional(),
});

// Tip schemas
export const TipCreateSchema = z.object({
  text: z.string().min(1).max(2000),
  tags: z.array(TipTag).max(3),
});

export const TipUpdateSchema = z.object({
  text: z.string().min(1).max(2000).optional(),
  tags: z.array(TipTag).max(3).optional(),
});

export const TipVoteSchema = z.object({
  vote: z.enum(['up', 'down']),
});

// Child schemas
export const ChildCreateSchema = z.object({
  name: z.string().min(1),
  photo: z.string().nullable().optional(),
  dateOfBirth: z.string(),
  sex: Sex.default(''),
  isPregnancy: z.boolean().default(false),
  dueDate: z.string().nullable().optional(),
  publicFields: z.array(z.string()).default([]),
  allergies: z.array(z.string()).default([]),
  medicalNotes: z.string().default(''),
});

export const ChildUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  photo: z.string().nullable().optional(),
  dateOfBirth: z.string().optional(),
  sex: Sex.optional(),
  isPregnancy: z.boolean().optional(),
  dueDate: z.string().nullable().optional(),
  publicFields: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  medicalNotes: z.string().optional(),
});

// Growth schemas
export const GrowthEntrySchema = z.object({
  date: z.string(),
  value: z.number().positive(),
});

// Vaccination schemas
export const VaccinationCreateSchema = z.object({
  name: z.string().min(1),
  date: z.string().nullable().optional(),
  isDue: z.boolean().default(false),
  dueDate: z.string().nullable().optional(),
});

export const VaccinationUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  date: z.string().nullable().optional(),
  isDue: z.boolean().optional(),
  dueDate: z.string().nullable().optional(),
});

// Milestone schemas
export const MilestoneUpdateSchema = z.object({
  achieved: z.boolean(),
  achievedDate: z.string().nullable().optional(),
});

// Photo timeline schemas
export const TimelineEntrySchema = z.object({
  date: z.string(),
  photo: z.string().default(''),
  note: z.string().default(''),
});

// Vault schemas
export const VaultDocumentCreateSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  owner: OwnerType,
  type: DocumentType,
  size: z.string().default('0 KB'),
  date: z.string(),
  note: z.string().optional(),
  isOffline: z.boolean().default(false),
  url: z.string().default(''),
});

export const VaultDocumentUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  owner: OwnerType.optional(),
  type: DocumentType.optional(),
  size: z.string().optional(),
  date: z.string().optional(),
  note: z.string().optional(),
  isOffline: z.boolean().optional(),
  url: z.string().optional(),
});

export const VaultPinSchema = z.object({
  pin: z.string().length(4),
});

// Privacy schemas
export const PrivacyUpdateSchema = z.object({
  preset: z.enum(['Maximum', 'Community', 'Open']).optional(),
  fieldVisibility: z.record(z.boolean()).optional(),
});

export const PrivacyLogCreateSchema = z.object({
  action: z.string().min(1),
  details: z.string().min(1),
});

// Community schemas
export const ConnectionRequestSchema = z.object({
  receiverId: z.string().min(1),
});

export const ConnectionUpdateSchema = z.object({
  status: ConnectionStatus,
});

// Wellbeing schemas
export const MoodEntrySchema = z.object({
  emoji: z.string().min(1),
  label: z.string().min(1),
  note: z.string().optional(),
});

export const SelfCareGoalUpdateSchema = z.object({
  completed: z.boolean(),
});

// Journey schemas
export const JourneyEventCreateSchema = z.object({
  type: JourneyEventType,
  title: z.string().min(1),
  date: z.string(),
  icon: JourneyEventIcon,
});

export const LegacyLetterUpdateSchema = z.object({
  to: z.string().min(1).optional(),
  unlockDate: z.string().optional(),
  preview: z.string().optional(),
  content: z.string().optional(),
});

export const HistoricalMemoryCreateSchema = z.object({
  photo: z.string().default(''),
  caption: z.string().min(1),
  date: z.string(),
});

// Pagination
export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Response shape
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export function successResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
  return { success: true, message, data };
}

export function errorResponse(message: string, data: unknown = null): ApiResponse<unknown> {
  return { success: false, message, data };
}
