const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Fammous People" },
        { name: "Movies & TV" },
        { name: "Musicians" },
        { name: "Games" },
        { name: "Animals" },
        { name: "Philosophy" },
        {name: "Scientists"},
      ]
    })
  } catch (error) {
    console.error("Error seeding default catregories", error);
    
  } finally {
    db.$disconnect();
  }
}

main();