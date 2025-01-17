export async function getDailyCrystal() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const crystals = [
    {
      name: "Amethyst",
      image: "https://images.unsplash.com/photo-1567593810070-7a3d471af022",
      properties: [
        "Spiritual awareness",
        "Inner peace",
        "Intuition",
        "Protection"
      ],
      astrologicalInfluences: [
        "Pisces",
        "Virgo",
        "Aquarius"
      ],
      guidance: "Focus on spiritual growth and inner wisdom today. Amethyst helps calm the mind and enhance meditation practices."
    },
    {
      name: "Rose Quartz",
      image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0",
      properties: [
        "Love",
        "Emotional healing",
        "Self-acceptance",
        "Heart chakra"
      ],
      astrologicalInfluences: [
        "Taurus",
        "Libra",
        "Cancer"
      ],
      guidance: "Open your heart to love and compassion today. Rose Quartz helps heal emotional wounds and promote self-love."
    }
  ];
  
  return crystals[Math.floor(Math.random() * crystals.length)];
}