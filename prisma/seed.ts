import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

async function main() {
  console.log('Seeding database...');

  const passwordHash = await hashPassword('password123');

  const user = await prisma.user.create({
    data: {
      email: 'sarah.t@gmail.com',
      passwordHash,
      name: 'Sarah Thompson',
      avatar: null,
      motherhoodStage: 'New Mum',
      motherhoodMonths: 4,
      occupation: 'UX Designer',
      country: 'United Kingdom',
      countryFlag: '🇬🇧',
      location: 'London',
      phone: '+44 7123 456 892',
      isVerified: true,
      verificationStatus: 'Verified',
      profileCompletion: 78,
    },
  });

  const posts = await prisma.post.createMany({
    data: [
      { userId: user.id, thumbnail: '', caption: 'First smile captured! 💕 My heart is so full today.', privacy: 'public', createdAt: new Date('2026-04-10') },
      { userId: user.id, thumbnail: '', caption: 'Bath time giggles 🛁', privacy: 'private', createdAt: new Date('2026-04-08') },
      { userId: user.id, thumbnail: '', caption: 'Our morning walk routine 🌿', privacy: 'public', createdAt: new Date('2026-04-05') },
      { userId: user.id, thumbnail: '', caption: 'Matching outfits day! 🎀', privacy: 'public', createdAt: new Date('2026-04-02') },
      { userId: user.id, thumbnail: '', caption: 'Naptime peace ✨', privacy: 'private', createdAt: new Date('2026-03-28') },
      { userId: user.id, thumbnail: '', caption: 'Tummy time champion 💪', privacy: 'public', createdAt: new Date('2026-03-25') },
    ],
  });

  const tips = await prisma.tip.createMany({
    data: [
      { userId: user.id, text: 'White noise really helped my little one sleep through the night. I use a fan on low setting — the consistent sound drowns out sudden noises that used to wake her up. Game changer for us after month three!', tags: ['Sleep'], helpfulPercent: 94, upvotes: 12, downvotes: 1, views: 89, createdAt: new Date('2026-04-08') },
      { userId: user.id, text: 'If breastfeeding feels overwhelming, try laid-back feeding positions. It was so much more comfortable for both of us and reduced the back pain I was getting from traditional holds.', tags: ['Breastfeeding', 'Postpartum'], helpfulPercent: 91, upvotes: 18, downvotes: 2, views: 134, createdAt: new Date('2026-04-01') },
      { userId: user.id, text: "Don't forget to eat well yourself, mum! I prep overnight oats every evening — quick, nourishing, and I can eat them one-handed while feeding. Add berries and nuts for extra energy.", tags: ['Nutrition', 'Mental Health'], helpfulPercent: 88, upvotes: 9, downvotes: 1, views: 67, createdAt: new Date('2026-03-20') },
    ],
  });

  const child = await prisma.child.create({
    data: {
      userId: user.id,
      name: 'Olivia',
      photo: null,
      dateOfBirth: '2025-12-13',
      sex: 'Female',
      isPregnancy: false,
      publicFields: ['name', 'photo'],
      allergies: [],
      medicalNotes: 'No concerns at 4-month check-up. Growing well.',
    },
  });

  await prisma.weightEntry.createMany({
    data: [
      { childId: child.id, date: '2025-12', value: 3.4 },
      { childId: child.id, date: '2026-01', value: 4.1 },
      { childId: child.id, date: '2026-02', value: 5.0 },
      { childId: child.id, date: '2026-03', value: 5.7 },
      { childId: child.id, date: '2026-04', value: 6.2 },
      { childId: child.id, date: '2026-05', value: 6.8 },
      { childId: child.id, date: '2026-06', value: 7.3 },
    ],
  });

  await prisma.heightEntry.createMany({
    data: [
      { childId: child.id, date: '2025-12', value: 50 },
      { childId: child.id, date: '2026-01', value: 53 },
      { childId: child.id, date: '2026-02', value: 56 },
      { childId: child.id, date: '2026-03', value: 58 },
      { childId: child.id, date: '2026-04', value: 61 },
      { childId: child.id, date: '2026-05', value: 63 },
      { childId: child.id, date: '2026-06', value: 65 },
    ],
  });

  await prisma.vaccination.createMany({
    data: [
      { childId: child.id, name: 'BCG', date: '2025-12-15', isDue: false },
      { childId: child.id, name: 'Hepatitis B (1st dose)', date: '2025-12-15', isDue: false },
      { childId: child.id, name: 'DTaP (1st dose)', date: '2026-02-13', isDue: false },
      { childId: child.id, name: 'Rotavirus (1st dose)', date: '2026-02-13', isDue: false },
      { childId: child.id, name: 'DTaP (2nd dose)', date: null, isDue: true, dueDate: '2026-04-13' },
      { childId: child.id, name: 'MMR (1st dose)', date: null, isDue: true, dueDate: '2026-12-13' },
    ],
  });

  await prisma.milestone.createMany({
    data: [
      { childId: child.id, label: 'First smile', achieved: true, achievedDate: '2026-02-10' },
      { childId: child.id, label: 'Holds head up', achieved: true, achievedDate: '2026-03-01' },
      { childId: child.id, label: 'Rolls over', achieved: true, achievedDate: '2026-04-05' },
      { childId: child.id, label: 'Sits without support', achieved: false },
      { childId: child.id, label: 'First words', achieved: false },
      { childId: child.id, label: 'Crawling', achieved: false },
      { childId: child.id, label: 'First steps', achieved: false },
    ],
  });

  await prisma.photoTimelineEntry.createMany({
    data: [
      { childId: child.id, date: '2025-12', photo: '', note: 'First day home! 🏠' },
      { childId: child.id, date: '2026-02', photo: '', note: 'First real smile. My heart! ❤️' },
      { childId: child.id, date: '2026-04', photo: '', note: 'Tummy time champion! 💪' },
    ],
  });

  await prisma.vaultDocument.createMany({
    data: [
      { userId: user.id, name: 'Maternity Notes - NHS', category: 'Maternity Records', owner: 'mother', type: 'pdf', size: '2.4 MB', date: '2025-06-15', isOffline: true },
      { userId: user.id, name: 'Blood Test Results', category: 'Lab Reports', owner: 'mother', type: 'pdf', size: '890 KB', date: '2025-09-20', isOffline: false },
      { userId: user.id, name: 'Olivia Birth Certificate', category: 'Birth Certificate', owner: 'child', type: 'image', size: '1.8 MB', date: '2026-01-05', isOffline: true },
      { userId: user.id, name: 'Vaccination Card', category: 'Vaccination Records', owner: 'child', type: 'image', size: '1.2 MB', date: '2026-02-13', isOffline: false },
    ],
  });

  await prisma.privacyLog.createMany({
    data: [
      { userId: user.id, action: 'Preset Applied', date: '2 days ago', details: 'Maximum Privacy mode activated' },
      { userId: user.id, action: 'Field Updated', date: '1 week ago', details: 'Child DOB set to private' },
      { userId: user.id, action: 'Access Granted', date: '2 weeks ago', details: 'Added 2 connections to "Trusted Circle"' },
    ],
  });

  // Create other users for connections
  const emma = await prisma.user.create({
    data: { email: 'emma@example.com', passwordHash, name: 'Emma L.', motherhoodStage: 'New Mum', profileCompletion: 60 },
  });
  const aria = await prisma.user.create({
    data: { email: 'aria@example.com', passwordHash, name: 'Aria S.', motherhoodStage: 'Pregnant', profileCompletion: 50 },
  });
  const sofia = await prisma.user.create({
    data: { email: 'sofia@example.com', passwordHash, name: 'Sofia M.', motherhoodStage: 'Toddler Mum', profileCompletion: 80 },
  });
  const james = await prisma.user.create({
    data: { email: 'james@example.com', passwordHash, name: 'James W.', motherhoodStage: 'Experienced Mum', profileCompletion: 90 },
  });

  await prisma.connection.createMany({
    data: [
      { initiatorId: user.id, receiverId: emma.id, status: 'accepted' },
      { initiatorId: user.id, receiverId: aria.id, status: 'accepted' },
      { initiatorId: sofia.id, receiverId: user.id, status: 'accepted' },
      { initiatorId: james.id, receiverId: user.id, status: 'accepted' },
    ],
  });

  await prisma.communityBadge.createMany({
    data: [
      { userId: user.id, label: 'Wisdom Sharer', icon: '🧠', desc: 'Shared 50+ helpful tips', color: 'var(--mauve)' },
      { userId: user.id, label: 'First Responder', icon: '🚑', desc: 'Supported 10+ mums in need', color: 'var(--sage)' },
      { userId: user.id, label: 'Supportive Sister', icon: '🤝', desc: 'Sent 100+ hugs & messages', color: 'var(--blush)' },
    ],
  });

  await prisma.gratitudeMessage.createMany({
    data: [
      { fromId: emma.id, toId: user.id, text: 'Thanks Sarah! Your tip on sleep training was a lifesaver last night. ❤️', date: 'Yesterday' },
      { fromId: aria.id, toId: user.id, text: 'So grateful for the hospital bag checklist you shared. Feeling prepared! 🌸', date: '3 days ago' },
    ],
  });

  await prisma.moodEntry.createMany({
    data: [
      { userId: user.id, emoji: '😊', label: 'Good', date: 'Today', note: 'Feeling rested after a full night!' },
      { userId: user.id, emoji: '😴', label: 'Tired', date: 'Yesterday' },
      { userId: user.id, emoji: '🤯', label: 'Overwhelmed', date: '2 days ago', note: 'Teething is hard.' },
    ],
  });

  await prisma.selfCareGoal.createMany({
    data: [
      { userId: user.id, label: 'Drink 2L of water', completed: true },
      { userId: user.id, label: 'Take a 5-minute breather', completed: false },
      { userId: user.id, label: 'Read 2 pages of a book', completed: false },
    ],
  });

  await prisma.journeyEvent.createMany({
    data: [
      { userId: user.id, type: 'system', title: 'Joined MummaElephant', date: '2025-06-15', icon: 'calendar' },
      { userId: user.id, type: 'post', title: 'Shared first tip on Sleep', date: '2025-08-10', icon: 'lightbulb' },
      { userId: user.id, type: 'milestone', title: 'Olivia Arrival!', date: '2025-12-13', icon: 'baby' },
      { userId: user.id, type: 'milestone', title: 'First 100 Hearts reached', date: '2026-02-20', icon: 'heart' },
    ],
  });

  await prisma.legacyLetter.create({
    data: {
      userId: user.id,
      to: 'Olivia',
      date: '2026-04-01',
      unlockDate: '2030-12-13',
      preview: 'Dear Olivia, today you took your first step...',
      content: 'Dear Olivia, today you took your first step...',
    },
  });

  await prisma.historicalMemory.create({
    data: {
      userId: user.id,
      photo: '',
      caption: 'Feeling so nervous but excited today. The nursery is finally ready!',
      date: '1 Year Ago Today',
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
