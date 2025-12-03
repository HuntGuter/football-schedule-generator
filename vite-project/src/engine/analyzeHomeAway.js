export function analyzeHomeAway(schedule, teams) {
    const map = {};

    teams.forEach(team => {
        map[team.id] = [];
    });

    for (let week of schedule) {
        for (let game of week.matches) {
            map[game.homeTeamId].push('H');
            map[game.awayTeamId].push('A');
        }
    }

    return map;
}