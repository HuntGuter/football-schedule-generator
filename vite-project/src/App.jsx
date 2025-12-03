import { teams } from './data/teams';
import { generateBaseSchedule } from './engine/generateBaseEngine';
import { generateSecondRound } from './engine/generateSecondRound';

function App() {
  const firstRound = generateBaseSchedule(teams);
  const secondRound = generateSecondRound(firstRound);

  const fullSchedule = [...firstRound, ...secondRound];
  console.log('Generated Schedule:', fullSchedule);

  return (
    <div>
      <h1>Football Schedule Generator</h1>
    </div>
  );
}

export default App;