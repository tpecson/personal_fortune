export async function getMoonPhase() {
  // Simulating an API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const currentDate = new Date();
  const synmonth = 29.53058867;
  const date1 = new Date('Jan 6 2000');
  const date2 = currentDate;
  const phase = ((date2.getTime() - date1.getTime())/1000) % (synmonth*86400) / (synmonth*86400);
  
  const phaseNumber = phase * 29.5;
  
  // Determine moon phase name and properties
  let name, properties, rituals;
  if (phaseNumber < 3.7) {
    name = "New Moon";
    properties = ["New Beginnings", "Setting Intentions", "Fresh Start"];
    rituals = "Perfect time for setting new goals and planting seeds of intention. Focus on personal growth and new projects.";
  } else if (phaseNumber < 7.4) {
    name = "Waxing Crescent";
    properties = ["Growth", "Creation", "Momentum"];
    rituals = "Channel your energy into building and creating. Take action on goals set during the New Moon.";
  } else if (phaseNumber < 11.1) {
    name = "First Quarter";
    properties = ["Action", "Decision", "Commitment"];
    rituals = "Time to overcome challenges and make important decisions. Stay committed to your goals.";
  } else if (phaseNumber < 14.8) {
    name = "Waxing Gibbous";
    properties = ["Refinement", "Patience", "Preparation"];
    rituals = "Focus on refining your projects and preparing for completion. Pay attention to details.";
  } else if (phaseNumber < 18.5) {
    name = "Full Moon";
    properties = ["Completion", "Illumination", "Manifestation"];
    rituals = "Celebrate achievements and manifest your desires. Powerful time for rituals and spellwork.";
  } else if (phaseNumber < 22.2) {
    name = "Waning Gibbous";
    properties = ["Gratitude", "Sharing", "Teaching"];
    rituals = "Share your knowledge and express gratitude. Good time for teaching and mentoring others.";
  } else if (phaseNumber < 25.9) {
    name = "Last Quarter";
    properties = ["Release", "Forgiveness", "Transition"];
    rituals = "Let go of what no longer serves you. Focus on forgiveness and clearing space.";
  } else {
    name = "Waning Crescent";
    properties = ["Rest", "Reflection", "Surrender"];
    rituals = "Time for quiet reflection and rest. Prepare for the next cycle of new beginnings.";
  }
  
  return {
    phase: phaseNumber,
    illumination: Math.cos(phase * 2 * Math.PI),
    name,
    properties,
    rituals
  };
}