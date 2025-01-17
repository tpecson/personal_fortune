export async function getBiorhythm(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  const diff = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    physical: Math.sin((2 * Math.PI * diff) / 23),
    emotional: Math.sin((2 * Math.PI * diff) / 28),
    intellectual: Math.sin((2 * Math.PI * diff) / 33)
  };
}