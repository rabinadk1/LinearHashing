class LinearHashing {
    // key.isDeleted is true is key is null
    constructor(tableSize = 11) {
        this.tableSize = tableSize
        this.hashTable = new Array(tableSize)
    }
    hashFunction(key, order) {
        return (key + order) % this.tableSize
    }
    insert(key) {
        key = parseInt(key)
        if (isNaN(key))
            throw "Invalid Key!"
        for (let i = 0; i < this.tableSize; ++i) {
            let hashedKey = this.hashFunction(key, i)
            switch (this.hashTable[hashedKey]) {
                case undefined:
                case null:
                    this.hashTable[hashedKey] = key
                    return hashedKey
                case key:
                    throw "Duplicate Key!"
            }
        }
        throw "Overflow!"
    }
    search(key) {
        key = parseInt(key)
        if (isNaN(key))
            throw "Invalid Key!"
        for (let i = 0; i < this.tableSize; ++i) {
            let hashedKey = this.hashFunction(key, i)
            switch (this.hashTable[hashedKey]) {
                case undefined:
                    throw "Key Not Found!"
                case key:
                    return hashedKey
            }
        }
    }
    delete(key) {
        let hashedKey = this.search(key)
        this.hashTable[hashedKey] = null
        return hashedKey
    }
}