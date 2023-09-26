class Repository {
  constructor(items) {
    this.items = items
  }

  async findById(itemId) {
    return this.items.find(({ id }) => id === itemId)
  }
}

module.exports = Repository