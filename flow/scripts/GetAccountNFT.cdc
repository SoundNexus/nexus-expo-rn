// Print All NFTs

import NexusNFTContract from 0x57ed4b51ee8750f4

// Print the NFTs owned by accounts 0x01 and 0x02.
pub fun main() {
  // Get both public account objects
  let account1 = getAccount(0x71aa02495aaf6221);

  // Find the public Receiver capability for their Collections
  let acct1Capability = account1.getCapability(NexusNFTContract.CollectionPublicPath)

  // borrow references from the capabilities
  let receiver1Ref = acct1Capability.borrow<&{NexusNFTContract.NFTReceiver}>()
      ?? panic("Could not borrow account 1 receiver reference")

  // Print both collections as arrays of IDs
  log("Account 1 NFTs")
  log(receiver1Ref.getIDs())
}