pub contract Nexus {


  pub resource interface NFTReceiver {

  // Can withdraw a token by its ID and returns
  // the token.
      pub fun withdraw(id: UInt64): @NFT

  // Can deposit an NFT to this NFTReceiver.
      pub fun deposit(token: @NFT)

  // Can fetch all NFT IDs belonging to this
  // NFTReceiver.
      pub fun getTokenIds(): [UInt64]

  // Can fetch the metadata of an NFT instance
  // by its ID.
      pub fun getTokenMetadata(id: UInt64) : {String: String}

  // Can update the metadata of an NFT.
      pub fun updateTokenMetadata(id: UInt64, metadata: {String: String})
	}
  

// This dictionary stores token owners' addresses.
pub var owners: {UInt64: Address}
pub resource NFT {

// The Unique ID for each token, starting from 1.
pub let id: UInt64

// String -> String dictionary to hold
// token's metadata.
pub var metadata: {String: String}

// The NFT's constructor. All declared variables are
// required to be initialized here.
init(id: UInt64, metadata: {String: String}) {
		self.id = id
		self.metadata = metadata
		}
	}
}