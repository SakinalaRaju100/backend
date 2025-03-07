// const items = [1, 2, 3, 4, 5];

// const processItem = async (item) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Processed item: ${item}`);
//       resolve(`Result for ${item}`);
//     }, Math.random() * 5000); // Simulate async work
//   });
// };

// // Run all tasks in parallel
// const runParallel = async () => {
//   const results = await Promise.all(items.map((item) => processItem(item)));
//   console.log("All items processed:", results);
// };
// runParallel();

// const items = [1, 2, 3, 4, 5];

// async function processItem(item) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Processed item: ${item}`);
//       resolve(`Result for ${item}`);
//     }, 10000); // Simulate async work
//   });
// }

// // Run all tasks in parallel
// async function runParallel() {
//   const results = await Promise.all(items.map((item) => processItem(item)));
//   console.log("All items processed:", results);
// }

// runParallel();

// // Wrong
// const items = [1, 2, 3, 4, 5];

// // Asynchronous function to start all tasks in parallel
// async function runParallel() {
//   for (let item of items) {
//     console.log(`Processed item out settime: ${item}`);
//     await setTimeout(async () => {
//       await console.log(`Processed item in settime: ${item}`);
//     }, 10000); // Simulate async work
//   }
// }

// runParallel();

const items = [1, 2, 3, 4, 5];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runSequential() {
  for (let item of items) {
    await delay(10000); // Wait for 10 seconds
    console.log(`Processed item out settime: ${item}`);
    console.log(`Processed item in settime: ${item}`);
  }
}

runSequential();
