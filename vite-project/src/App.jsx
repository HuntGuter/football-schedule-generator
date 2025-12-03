import { teams } from './data/teams';
import { generateBaseSchedule } from './engine/generateBaseEngine';

function App() {
  const schedule = generateBaseSchedule(teams);
  console.log('Generated Schedule:', schedule);

  return (
    <div>
      <h1>Football Schedule Generator</h1>
    </div>
  );
}

export default App;