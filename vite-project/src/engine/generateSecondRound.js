import {shuffleArray} from './shuffleArray.js';

export function generateSecondRound (firstRound) {
    const secondRound = JSON.parse(JSON.stringify(firstRound));

    for (let week of secondRound) {
        for (let match of week.matches) {
            const temp = match.homeTeamId;
            match.homeTeamId = match.awayTeamId;
            match.awayTeamId = temp;
        }
    }
    
    for (let week of secondRound) {
        week.matches = shuffleArray(week.matches);
    }

    const shuffledWeeks = shuffleArray(secondRound);
    
    shuffledWeeks.forEach((week, index) => {
        week.week = index + 20;
    });

    return shuffledWeeks;
}


