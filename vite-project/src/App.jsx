import { teams } from './data/teams';
import { generateBaseSchedule } from './engine/generateBaseEngine';
import { generateSecondRound } from './engine/generateSecondRound';
import { randomizefirstRound } from './engine/randomizeMatches';

function App() {
  const firstRound = generateBaseSchedule(teams);
  const randomizedFirstRound = randomizefirstRound(firstRound);
  const secondRound = generateSecondRound(randomizedFirstRound);

  const fullSchedule = [...randomizedFirstRound, ...secondRound];
  console.log('Generated Schedule:', fullSchedule);

  return (
    <div>
      <h1>Football Schedule Generator</h1>
    </div>
  );
}

export default App;