import { teams } from './data/teams';
import { generateBaseSchedule } from './engine/generateBaseEngine';
import { generateSecondRound } from './engine/generateSecondRound';
import { randomizefirstRound } from './engine/randomizeMatches';
import { analyzeHomeAway } from './engine/analyzeHomeAway';
import { fixHomeAway } from './engine/fixHomeAway';

function App() {
  const firstRound = generateBaseSchedule(teams);
  const randomizedFirstRound = randomizefirstRound(firstRound);
  const optimizedFirstRound = fixHomeAway(randomizedFirstRound, teams, { maxIterations: 5000 });
  const secondRound = generateSecondRound(optimizedFirstRound);

  const fullSchedule = [...optimizedFirstRound, ...secondRound];
  console.log('Generated Schedule:', fullSchedule);

  const homeAwayAnalysis = analyzeHomeAway(fullSchedule, teams);
  console.log('Home/Away Analysis:', homeAwayAnalysis);

  return (
    <div>
      <h1>Football Schedule Generator</h1>
    </div>
  );
}

export default App;