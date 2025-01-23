




export const formatTimestamp = (date)=> {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

export const robotThoughts = [
  "Beep boop! Want to learn about blockchain? 🤖",
  "Did you know Shiva built a DeFi platform? ⚡",
  "I love talking about smart contracts! 💡",
  "Ask me about Shiva's projects! 🚀",
  "Blockchain technology is fascinating! 🔗",
  "I can tell you about Solana development! 🌟",
  "Want to hear about Shiva's journey? 🎯",
  "I know all about Web3 development! 🌐",
  "Curious about NFTs? Let's chat! 🎨",
  "I'm processing blockchain data... Just kidding! 😄",
  "My circuits are buzzing with excitement! ⚡",
  "I'm powered by blockchain knowledge! 🔋",
  "Debugging smart contracts is my hobby! 🛠️",
  "Let's talk about decentralized tech! 🌍",
  "I dream in binary... and blockchain! 💫"
];