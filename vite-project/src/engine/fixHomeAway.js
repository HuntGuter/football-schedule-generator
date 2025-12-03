import { analyzeHomeAway } from "./analyzeHomeAway";

export function fixHomeAway(firstRoundSchedule, teams, options = {}) {
    const maxItterations = options.maxIterations ?? 5000;

    let current = JSON.parse(JSON.stringify(firstRoundSchedule));
    let currentScore = scoreSchedule(current, teams);

    let best = current;
    let bestScore = currentScore;

    const weeksCount = current.length;

    for (let i = 0; i < maxItterations; i++) {
        const candidate = JSON.parse(JSON.stringify(current));

        const week1Index = Math.floor(Math.random() * weeksCount);
        const matchesCount = candidate[week1Index].matches.length;
        const match1Index = Math.floor(Math.random() * matchesCount);

        const match = candidate[week1Index].matches[match1Index];

        const oldHome = match.homeTeamId;
        match.homeTeamId = match.awayTeamId;
        match.awayTeamId = oldHome;

        const candidateScore = scoreSchedule(candidate, teams);

        if (candidateScore < currentScore) {
            current = candidate;
            currentScore = candidateScore;
            
            if (currentScore < bestScore) {
                best = current;
                bestScore = currentScore;
            }
        }
    }

    return best;    
}

function scoreSchedule(schedule, teams) {
    const homeAwayMap = analyzeHomeAway(schedule, teams);
    let score = 0;

    for (let id in homeAwayMap) {
        const sequence = homeAwayMap[id];
        score += scoreTeamSequence(sequence);
    }

    return score;
}

function scoreTeamSequence(sequence) {
    let score = 0;
    let runChar = null;
    let runLength = 0;
    let homeCount = 0;
    let awayCount = 0;

    for (const char of sequence) {
        if (char === 'H') { homeCount++; }
        if (char === 'A') { awayCount++; }

        if (char === runChar) {
            runLength++;
        } else {
            if (runLength > 2) {
                const extra = runLength - 2;
                score += extra * extra;
            }
            runChar = char;
            runLength = 1;
        }

        if (runLength > 2) {
            const extra = runLength - 2;
            score += extra * extra;
        }

        score += Math.abs(homeCount - awayCount);
    }

    return score;
}