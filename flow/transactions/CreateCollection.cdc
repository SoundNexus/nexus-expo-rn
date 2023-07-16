import NexusNFTContract from 0x57ed4b51ee8750f4

// This transaction allows the Minter account to mint an NFT
// and deposit it into its collection.

transaction {

  // The reference to the collection that will be receiving the NFT
  let receiverRef: &{NexusNFTContract.NFTReceiver}

  prepare(acct: AuthAccount) {
    // Create a new empty collection
    let collection <- NexusNFTContract.createEmptyCollection()

    // store the empty NFT Collection in account storage
    acct.save<@NexusNFTContract.Collection>(<-collection, to: NexusNFTContract.CollectionStoragePath)

    log("Collection created")

    // create a public capability for the Collection
    acct.link<&{NexusNFTContract.NFTReceiver}>(NexusNFTContract.CollectionPublicPath, target: NexusNFTContract.CollectionStoragePath)

    log("Capability created")
  }
}