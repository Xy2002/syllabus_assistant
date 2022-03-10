const bcrypt = require('bcrypt')

const genHash = async (text) => {
    return await bcrypt.hash(text, 10)
}

const compareHash = async (text, hash) => {
    return await bcrypt.compare(text, hash)
}

module.exports = {genHash, compareHash}
