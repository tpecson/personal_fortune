export async function getIChing() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const hexagramData = [
    { number: 1, name: "The Creative Heaven", interpretation: "The Creative represents the primal power of creation. This hexagram suggests a time of great potential and pure, primal force." },
    { number: 2, name: "The Receptive Earth", interpretation: "The Receptive represents the perfect complement to the Creative, the feminine, receptive principle of nature." },
  ];
  
  const lines = Array.from({ length: 6 }, () => Math.floor(Math.random() * 4) + 6);
  const hexagram = lines.map(line => line % 2 === 0 ? "yin" : "yang");
  const selectedHexagram = hexagramData[Math.floor(Math.random() * hexagramData.length)];
  
  return {
    lines: hexagram,
    name: selectedHexagram.name,
    number: `Hexagram ${selectedHexagram.number}`,
    interpretation: selectedHexagram.interpretation
  };
}