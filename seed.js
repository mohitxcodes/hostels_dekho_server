/**
 * Seed script — pushes all hostels data into MongoDB.
 * Run once with:  node seed.js
 *
 * Safe to re-run: uses upsert on slug so duplicates are never created.
 */

const mongoose = require('mongoose');
require('dotenv').config();

const Hostel = require('./models/Hostel');

const hostels = [
  {
    slug: 'boys-hostel-1',
    name: 'Boys Hostel 1',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: true,
    description:
      'Premium boys hostel located in the heart of Knowledge Park III, walking distance from major colleges. Features spacious rooms, high-speed Wi-Fi, and nutritious home-style meals.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-1/image_1.jpeg',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-1/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-1/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-1/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-1/image_5.webp',
    ],
  },
  {
    slug: 'girls-hostel-1',
    name: 'Girls Hostel 1',
    city: 'Greater Noida',
    gender: 'Girls',
    verified: false,
    description:
      'A safe, secure, and modern PG exclusively for girls in the peaceful Alpha 1 sector. Offers fully furnished rooms with attached washrooms and excellent food quality.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-1/image_1.jpeg',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-1/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-1/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-1/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-1/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-2',
    name: 'Boys Hostel 2',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: false,
    description:
      'Modern co-living space designed for working professionals and students. Features a common lounge, gaming zone, gym, and fully equipped community kitchen.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-2/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-2/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-2/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-2/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-2/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-3',
    name: 'Boys Hostel 3',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: false,
    description:
      'Budget-friendly boys PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-3/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-3/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-3/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-3/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-3/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-4',
    name: 'Boys Hostel 4',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: false,
    description:
      'Budget-friendly boys PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-4/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-4/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-4/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-4/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-4/image_5.webp',
    ],
  },
  {
    slug: 'girls-hostel-2',
    name: 'Girls Hostel 2',
    city: 'Greater Noida',
    gender: 'Girls',
    verified: false,
    description:
      'Budget-friendly girls PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-2/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-2/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-2/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-2/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-2/image_5.webp',
    ],
  },
  {
    slug: 'girls-hostel-3',
    name: 'Girls Hostel 3',
    city: 'Greater Noida',
    gender: 'Girls',
    verified: false,
    description:
      'Budget-friendly girls PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-3/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-3/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-3/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-3/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/girls-hostel-3/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-5',
    name: 'Boys Hostel 5',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: true,
    description:
      'Budget-friendly boys PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-5/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-5/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-5/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-5/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-5/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-6',
    name: 'Boys Hostel 6',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: true,
    description:
      'Budget-friendly boys PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-6/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-6/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-6/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-6/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-6/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-7',
    name: 'Boys Hostel 7',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: false,
    description:
      'Budget-friendly boys PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-7/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-7/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-7/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-7/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-7/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-8',
    name: 'Boys Hostel 8',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: false,
    description:
      'Budget-friendly boys PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-8/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-8/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-8/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-8/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-8/image_5.webp',
    ],
  },
  {
    slug: 'boys-hostel-9',
    name: 'Boys Hostel 9',
    city: 'Greater Noida',
    gender: 'Boys',
    verified: false,
    description:
      'Budget-friendly boys PG offering all essential amenities. Close to local markets and public transport.',
    images: [
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-9/image_1.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-9/image_2.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-9/image_3.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-9/image_4.webp',
      'https://wrbbmexbddmjbxrazpch.supabase.co/storage/v1/object/public/hostels_dekho/boys-hostel-9/image_5.webp',
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    let inserted = 0;
    let skipped = 0;

    for (const hostel of hostels) {
      const result = await Hostel.updateOne(
        { slug: hostel.slug },
        { $setOnInsert: hostel },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        inserted++;
        console.log(`  ✅ Inserted: ${hostel.name}`);
      } else {
        skipped++;
        console.log(`  ⏭️  Skipped (already exists): ${hostel.name}`);
      }
    }

    console.log(`\nSeed complete — ${inserted} inserted, ${skipped} skipped.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedDB();
