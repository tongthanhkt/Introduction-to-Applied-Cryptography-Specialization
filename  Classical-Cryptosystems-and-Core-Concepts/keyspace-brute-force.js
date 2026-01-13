function bruteForceTime(keyspace, attemptsPerSecond) {
    return keyspace / attemptsPerSecond;
}

// Caesar cipher
const caesarKeyspace = 26;

// Monoalphabetic cipher
const monoKeyspace = factorial(26);

function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

console.log("Caesar seconds:", bruteForceTime(caesarKeyspace, 1e6));
console.log("Monoalphabetic seconds:", bruteForceTime(monoKeyspace, 1e12));
