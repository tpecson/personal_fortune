export async function getTarotReading() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const cards = [
    { 
      name: "The Fool", 
      position: "past",
      reversed: false,
      image: "https://images.unsplash.com/photo-1601024445121-e294d1c73b37",
      meaning: "New beginnings, innocence, spontaneity"
    },
    { 
      name: "The Magician", 
      position: "present",
      reversed: true,
      image: "https://images.unsplash.com/photo-1572937336162-31b8f58c2784",
      meaning: "Manipulation, poor planning, untapped talents"
    },
    { 
      name: "The High Priestess", 
      position: "future",
      reversed: false,
      image: "https://images.unsplash.com/photo-1590902657566-09e8587cc612",
      meaning: "Intuition, sacred knowledge, divine feminine"
    }
  ];
  
  return {
    cards,
    interpretation: "Your journey begins with innocence and pure potential, represented by The Fool. Currently, you're learning to harness your personal power through The Magician, though its reversed position suggests some self-doubt. The High Priestess in your future indicates developing intuition and hidden knowledge coming to light."
  };
}