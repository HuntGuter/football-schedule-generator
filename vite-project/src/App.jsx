import { teams } from './data/teams';
import { generateBaseSchedule } from './engine/generateBaseEngine';
import { generateSecondRound } from './engine/generateSecondRound';
import { randomizefirstRound } from './engine/randomizeMatches';
import { analyzeHomeAway } from './engine/analyzeHomeAway';
import { fixHomeAway } from './engine/fixHomeAway';

function getMaxStreak(seq) {
  let max = 1, run = 1;
  for (let i = 1; i < seq.length; i++) {
    if (seq[i] === seq[i - 1]) run++;
    else run = 1;
    if (run > max) max = run;
  }
  return max;
}

function App() {
 
  console.log("Start test");

  const firstRound = generateBaseSchedule(teams);
  const randomizedFirstRound = randomizefirstRound(firstRound);
  const optimizedFirstRound = fixHomeAway(randomizedFirstRound, teams, { maxIterations: 8000});
  const secondRound = generateSecondRound(optimizedFirstRound);

  const fullSchedule = [...optimizedFirstRound, ...secondRound];
  console.log('Generated Schedule:', fullSchedule);

  const homeAwayAnalysis = analyzeHomeAway(fullSchedule, teams);
  console.log('Home/Away Analysis:', homeAwayAnalysis);

  for (let id in homeAwayAnalysis) {
    console.log(id, getMaxStreak(homeAwayAnalysis[id]));
  }

  for (let id in homeAwayAnalysis) {
    const arr = homeAwayAnalysis[id];
    const H = arr.filter(x => x === "H").length;
    const A = arr.filter(x => x === "A").length;
    console.log(`Team ${id}: H=${H}, A=${A}`);
  }



  return (
    <div>
      <h1>Football Schedule Generator</h1>
    </div>
  );
}

export default App;