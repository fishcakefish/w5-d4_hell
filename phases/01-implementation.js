class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets
    this.data = new Array(numBuckets).fill(null)
    this.count = 0
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    if (this.count / this.capacity > .7) this.resize()
    const index = this.hashMod(key)
    let currentKVP = this.data[index]
    while(currentKVP) {
      if (currentKVP.key === key) {
        currentKVP.value = value
        return;
      }
      currentKVP = currentKVP.next
    }

    const kvp = new KeyValuePair(key, value)
    kvp.next = this.data[index]
    this.data[index] = kvp
    this.count++

  }


  read(key) {
    // Your code here
    const i = this.hashMod(key)
    let currentKVP = this.data[i]
    while (currentKVP) {
      if (currentKVP.key === key) {
        return currentKVP.value
      }
      currentKVP = currentKVP.next
    }
    return undefined
  }


  resize() {
    // Your code here
    // console.log(this)
    this.count = 0;
    this.capacity *= 2
    let oldData = this.data
    this.data = new Array(this.capacity).fill(null)
    let cur;
    for (let i = 0; i < oldData.length; i++) {
      cur = oldData[i]
      while (cur) {
        this.insert(cur.key, cur.value)
        cur = cur.next
      }
    }
    // console.log(this)

  }


  delete(key) {
    // Your code here
    //ill do it tomorrow

  }
}


module.exports = HashTable;
