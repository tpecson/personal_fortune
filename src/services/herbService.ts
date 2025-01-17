export async function getHerbs() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      name: "Lavender",
      image: "https://images.unsplash.com/photo-1595235060330-c51166d60d69",
      description: "Sacred to Mercury, lavender is used for purification, peace, and restful sleep. Its calming properties make it ideal for meditation and dream work.",
      associations: {
        planet: "Mercury",
        element: "Air",
        gender: "Masculine",
        deities: ["Mercury", "Hecate", "Morpheus"],
        magickal_uses: [
          "Peace",
          "Sleep",
          "Purification",
          "Healing",
          "Love spells"
        ],
        zodiac: ["Virgo", "Gemini"]
      },
      illustration: "https://images.unsplash.com/photo-1471943311424-646960669fbc",
      additionalInfo: "Lavender has been used in magical practices for centuries. Its soothing aroma is known to enhance psychic abilities and promote peaceful dreams."
    },
    {
      name: "Rosemary",
      image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662",
      description: "Associated with the Sun and Fire, rosemary enhances memory, protection, and mental clarity. It's traditionally used to purify sacred spaces and strengthen spellwork.",
      associations: {
        planet: "Sun",
        element: "Fire",
        gender: "Masculine",
        deities: ["Apollo", "Hebe", "Ra"],
        magickal_uses: [
          "Protection",
          "Mental clarity",
          "Memory enhancement",
          "Purification",
          "Love spells",
          "Healing rituals"
        ],
        zodiac: ["Leo", "Aries"]
      },
      illustration: "https://images.unsplash.com/photo-1606604830754-4d0a0421d05e",
      additionalInfo: "Known as the 'herb of remembrance', rosemary has been used in folk medicine and magical practices for centuries. Its strong protective properties make it excellent for warding."
    },
    {
      name: "Sage",
      image: "https://images.unsplash.com/photo-1600831606133-c9b0aeb2aa0f",
      description: "Ruled by Jupiter, sage is a powerful cleansing herb used for wisdom, longevity, and purification. It's essential in smudging rituals and healing magic.",
      associations: {
        planet: "Jupiter",
        element: "Air",
        gender: "Masculine",
        deities: ["Zeus", "Minerva", "Athena"],
        magickal_uses: [
          "Cleansing",
          "Wisdom",
          "Longevity",
          "Protection",
          "Spiritual cleansing"
        ],
        zodiac: ["Sagittarius", "Aquarius"]
      },
      illustration: "https://images.unsplash.com/photo-1599099555183-5d76e889e6f9",
      additionalInfo: "White sage is particularly revered for its powerful cleansing properties. It's been used in sacred ceremonies to purify spaces and people for generations."
    },
    {
      name: "Chamomile",
      image: "https://images.unsplash.com/photo-1587593132708-ced55ed0f132",
      description: "Governed by the Sun, chamomile brings peace, prosperity, and healing. It's often used in sleep magic and for attracting abundance.",
      associations: {
        planet: "Sun",
        element: "Water",
        gender: "Feminine",
        deities: ["Freya", "Helios", "Eir"],
        magickal_uses: [
          "Peace",
          "Prosperity",
          "Sleep",
          "Meditation",
          "Love"
        ],
        zodiac: ["Cancer", "Libra"]
      },
      illustration: "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6",
      additionalInfo: "Chamomile is known as the 'plant's physician' because it helps other plants grow better. In magic, it's used to enhance any spell for peace and tranquility."
    },
    {
      name: "Mugwort",
      image: "https://images.unsplash.com/photo-15645088542-60a1b9ea0e09",
      description: "Sacred to the Moon, mugwort enhances psychic abilities and prophetic dreams. It's traditionally used for divination and astral travel.",
      associations: {
        planet: "Moon",
        element: "Earth",
        gender: "Feminine",
        deities: ["Artemis", "Diana", "Hecate"],
        magickal_uses: [
          "Divination",
          "Psychic development",
          "Dream work",
          "Astral travel",
          "Protection"
        ],
        zodiac: ["Cancer", "Pisces"]
      },
      illustration: "https://images.unsplash.com/photo-1564508967009-21c2cb240c7c",
      additionalInfo: "Also known as the 'traveler's herb', mugwort is traditionally used to protect travelers and enhance prophetic dreams when placed under the pillow."
    }
  ];
}