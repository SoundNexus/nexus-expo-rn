import NexusNFTContract from 0x57ed4b51ee8750f4

// This transaction allows the Minter account to mint an NFT
// and deposit it into its collection.

transaction {

  // The reference to the collection that will be receiving the NFT
  let receiverRef: &{NexusNFTContract.NFTReceiver}

  prepare(acct: AuthAccount) {
      // Get the owner's collection capability and borrow a reference
    self.receiverRef = acct.getCapability<&{NexusNFTContract.NFTReceiver}>(NexusNFTContract.CollectionPublicPath)
      .borrow()
      ?? panic("Could not borrow receiver reference")
  }

  execute {
    // Use the minter reference to mint an NFT, which deposits
    // the NFT into the collection that is sent as a parameter.
    let newNFT <- NexusNFTContract.mintNFT()

    self.receiverRef.deposit(token: <-newNFT)

    log("NFT Minted and deposited to Account 1's Collection")
  }
}