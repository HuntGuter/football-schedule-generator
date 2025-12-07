export function generateSecondRound(firstRound) {
    return firstRound.map((week, idx) => ({
        week: idx + 20,
        matches: week.matches.map(match => ({
            homeTeamId: match.awayTeamId,
            awayTeamId: match.homeTeamId
        }))
    }));
}
