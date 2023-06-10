const crypto = require('crypto');

class BloomFilter {
    constructor(capacity, errorRate, primaryHashFunction, secondaryHashFunction) {
        if (!primaryHashFunction || !secondaryHashFunction) {
            throw new Error('missing arguments');
        }
        const m = this._findBestM(capacity, errorRate);
        const k = this._findBestK(capacity, errorRate);
        console.log(`New BloomFilter k: ${k} m: ${m}`);

        this.hashBits = new Array(m);
        this.hashFunctionCount = k;
        this.getHashPrimary = primaryHashFunction;
        this.getHashSecondary = secondaryHashFunction;
    }

    add(item) {
        const primaryHash = this.getHashPrimary(item);
        const secondaryHash = this.getHashSecondary(item);
        for (let index = 0; index < this.hashFunctionCount; index++) {
            const hash = this._computeHash(primaryHash, secondaryHash, index);
            this.hashBits[hash] = true;
        }
    }

    maybeContains(item) {
        const primaryHash = this.getHashPrimary(item);
        const secondaryHash = this.getHashSecondary(item);
        for (let i = 0; i < this.hashFunctionCount; i++) {
            let hash = this._computeHash(primaryHash, secondaryHash, i);
            if (!this.hashBits[hash])
                return false;
        }
        return true;
    }

    /**
     * Computes number of bits in the filter.
     * ceil((n * log(p)) / log(1 / pow(2, log(2))));
     * https://hur.st/bloomfilter/
     */
    _findBestM(capacity, errorRate) {
        return Math.ceil(capacity * Math.log(errorRate) / Math.log(1 / Math.pow(2, Math.log(2))));
    }

    /**
     * Computes number of hash functions.
     * k = round((m / n) * log(2));
     * https://hur.st/bloomfilter/
     */
    _findBestK(capacity, errorRate) {
        return Math.round(this._findBestM(capacity, errorRate) / capacity * Math.log(2))
    }

    /**
     * Computes hash using Dillinger-Manolios method.
     * https://www.ccs.neu.edu/home/pete/pub/bloom-filters-verification.pdf
     */
    _computeHash(primaryHash, secondaryHash, i) {
        var resultingHash = (primaryHash + i * secondaryHash) % this.hashBits.length;
        return Math.abs(resultingHash);
    }
}

const stringToIntHash = (str) => {
    const upperBound = 1000;
    const lowerBound = 0;
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        result = result + str.charCodeAt(i);
    }

    return (result % (upperBound - lowerBound)) + lowerBound;
}

const primaryHash = (data) => {
    const hash = crypto.createHash('sha1')
    hash.update(data);
    return stringToIntHash(hash.digest('hex'));
}

const secondaryHash = (data) => {
    const hash = crypto.createHash('md5')
    hash.update(data);
    return stringToIntHash(hash.digest('hex'));
}

const bloomFilter = new BloomFilter(1000, 0.001, primaryHash, secondaryHash);
bloomFilter.add('foo');
console.log(`add 'foo'`);
bloomFilter.add('bar');
console.log(`add 'bar'`);
const containsFoo = bloomFilter.maybeContains('foo');
console.log(`contains 'foo':`, containsFoo);
const containsBar = bloomFilter.maybeContains('bar');
console.log(`contains 'bar':`, containsBar);
const doesNotContains = bloomFilter.maybeContains('abc');
console.log(`contains 'abc':`, doesNotContains);
