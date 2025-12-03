export function generateBaseSchedule(teams) {
  const numberOfTeams = teams.length;
  const rounds = numberOfTeams - 1;
  const matchesPerRound = numberOfTeams / 2;

  const list = [...teams]; 
  const fixed = list[0];
  let rotate = list.slice(1);

  const schedule = [];

  for (let round = 0; round < rounds; round++) {
    const matches = [];

    matches.push({
      homeTeamId: fixed.id,
      awayTeamId: rotate[rotate.length - 1].id,
    });

    for (let i = 0; i < matchesPerRound - 1; i++) {
      const home = rotate[i];
      const away = rotate[rotate.length - 2 - i];

      matches.push({
        homeTeamId: home.id,
        awayTeamId: away.id,
      });
    }

    schedule.push({
      week: round + 1,
      matches,
    });

    const last = rotate.pop();
    rotate = [rotate[0], last, ...rotate.slice(1)];
  }

  return schedule;
}
