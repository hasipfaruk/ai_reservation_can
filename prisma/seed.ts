import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define table configurations
const tableConfigs = [
  { number: 1, capacity: 2, location: "window" },
  { number: 2, capacity: 2, location: "window" },
  { number: 3, capacity: 4, location: "center" },
  { number: 4, capacity: 4, location: "center" },
  { number: 5, capacity: 6, location: "center" },
  { number: 6, capacity: 6, location: "patio" },
  { number: 7, capacity: 8, location: "patio" },
  { number: 8, capacity: 8, location: "private" },
  { number: 9, capacity: 10, location: "private" },
  { number: 10, capacity: 12, location: "party" },
];

async function main() {
  console.log(`Start seeding tables...`);

  // Delete existing tables if any
  try {
    await prisma.table.deleteMany({});
    console.log('Deleted existing tables');
  } catch (error) {
    console.error('Error deleting tables:', error);
  }

  // Create tables
  let createdCount = 0;
  for (const config of tableConfigs) {
    try {
      const table = await prisma.table.create({
        data: {
          number: config.number,
          capacity: config.capacity,
          location: config.location || "",
          isAvailable: true
        }
      });
      console.log(`Created table ${table.number} with capacity ${table.capacity}`);
      createdCount++;
    } catch (error) {
      console.error(`Failed to create table ${config.number}:`, error);
    }
  }

  console.log(`Seeding finished. Created ${createdCount} tables.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
