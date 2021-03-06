/* primeReduction.js

Consider the prime number 23. 

If we sum the square of its digits we  get: 2^2 + 3^2 = 13, then for 13: 1^2
+ 3^2 = 10, and finally for 10: 1^2 + 0^2 = 1.

Similarly, if we start with prime number 7, the sequence is: 7-> 49-> 97->
130-> 10-> 1.

Given a range, how many primes within that range have this property?

*/

function primeReduction(a, b) {
  const cache = [];

  // Eratosthenes algorithm to find all primes between 2..n
  const eratosthenes = (n) => {
    let array = [], upperLimit = Math.sqrt(n), output = [];

    // Make an array from a to (n - 1)
    for (let i = 0; i < n; i++) {
      array.push(true);
    }

    // Remove multiples of primes starting from 2,3,5,...
    for (let i = 2; i <= upperLimit; i++) {
      if (array[i]) {
        for (let j = i * i; j < n; j += i) {
          array[j] = false;
        }
      }
    }

    // All array[i] set to true are primes (in range a..b)
    for (let i = 2; i < n; i++) {
      if(array[i]) {
        output.push(i);
      }
    }

    return output;
  };

  // array of primes in range 2..b
  const primes = eratosthenes(b);
  
  // algorithm to find primes with the property
  const reducePrime = (p) => {
    if (p === 1)           return true;
    if (cache.includes(p)) return false;
    cache.push(p);

    const sum = p.toString().split('').
          reduce((acc,c) => {return acc + c * c}, 0);
    return reducePrime(sum);
  }

  // loop through array of primes, sending each to algorithm
  return (primes.filter((p) => {
    if (p >= a) {
      cache.length = 0;
      return reducePrime(p);
    }
  })).length;
}

console.log(primeReduction(13,50));
