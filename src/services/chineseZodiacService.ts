export interface ChineseZodiacInfo {
  animal: string;
  element: string;
  year: number;
  yearStatus: 'Auspicious' | 'Inauspicious' | 'Neutral';
}

const zodiacAnimals = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

export function getChineseZodiac(birthYear: number): ChineseZodiacInfo {
  const currentYear = new Date().getFullYear();
  
  // Calculate Chinese zodiac animal
  const animalIndex = (birthYear - 4) % 12;
  const animal = zodiacAnimals[animalIndex];
  
  // Calculate element (changes every 2 years)
  const elementIndex = Math.floor(((birthYear - 4) % 10) / 2);
  const element = elements[elementIndex];
  
  // Determine year status based on current year's animal
  const currentAnimalIndex = (currentYear - 4) % 12;
  const currentAnimal = zodiacAnimals[currentAnimalIndex];
  
  // Define relationships between animals
  const getYearStatus = (birthAnimal: string, currentAnimal: string): 'Auspicious' | 'Inauspicious' | 'Neutral' => {
    // Animals in the same triangle are auspicious
    const triangles = [
      ['Rat', 'Dragon', 'Monkey'],
      ['Ox', 'Snake', 'Rooster'],
      ['Tiger', 'Horse', 'Dog'],
      ['Rabbit', 'Goat', 'Pig']
    ];
    
    // Animals in opposition are inauspicious
    const oppositions: Record<string, string> = {
      'Rat': 'Horse',
      'Ox': 'Goat',
      'Tiger': 'Monkey',
      'Rabbit': 'Rooster',
      'Dragon': 'Dog',
      'Snake': 'Pig'
    };
    
    // Check if animals are in the same triangle (auspicious)
    for (const triangle of triangles) {
      if (triangle.includes(birthAnimal) && triangle.includes(currentAnimal)) {
        return 'Auspicious';
      }
    }
    
    // Check if animals are in opposition (inauspicious)
    if (
      oppositions[birthAnimal] === currentAnimal ||
      oppositions[currentAnimal] === birthAnimal
    ) {
      return 'Inauspicious';
    }
    
    // Otherwise neutral
    return 'Neutral';
  };
  
  return {
    animal,
    element,
    year: birthYear,
    yearStatus: getYearStatus(animal, currentAnimal)
  };
}