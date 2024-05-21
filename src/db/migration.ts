import { connectDB } from ".";

async function main() {
  try {
    await connectDB();
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

main();
