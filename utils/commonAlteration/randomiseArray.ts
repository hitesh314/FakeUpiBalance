export default function selectRandomItems(array, numItems = 4) {
  if (array.length <= numItems) {
    return array; // Return the full array if it has fewer or equal items
  }

  // Shuffle using sort and a random comparator
  const shuffled = array.sort(() => Math.random() - 0.5);

  // Return the first `numItems` items
  return shuffled.slice(0, numItems);
}
