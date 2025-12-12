export class SimilarityCalculator {
  calculate(guess: string, secret: string): { similarity: number; rank: number } {
    const dist = this.levenshteinDistance(guess.toLowerCase(), secret.toLowerCase());
    const maxLen = Math.max(guess.length, secret.length);
    const similarity = maxLen === 0 ? 1 : 1 - dist / maxLen;
    const rank = Math.floor((1 - similarity) * 50000);
    return { similarity: parseFloat(similarity.toFixed(2)), rank };
  }

  private levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= a.length; i++) {
    const row: number[] = [];

    for (let j = 0; j <= b.length; j++) {
      if (i === 0) {
        row[j] = j;
      } else if (j === 0) {
        row[j] = i;
      } else {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        const above = matrix[i - 1]![j]!;
        const left = row[j - 1]!;
        const diag = matrix[i - 1]![j - 1]!;

        row[j] = Math.min(above + 1, left + 1, diag + cost);
      }
    }

    matrix[i] = row;
  }

  return matrix[a.length]![b.length]!;
}
}