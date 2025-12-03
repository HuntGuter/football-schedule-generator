import { shuffleArray } from "./shuffleArray";

export function randomizefirstRound(firstRound) {
    const round = JSON.parse(JSON.stringify(firstRound));

    for (let week of round) {
        week.matches = shuffleArray(week.matches);
    }

    const randomizeWeeks = shuffleArray(round);

    randomizeWeeks.forEach((week, index) => {
        week.week = index + 1;
    });

    return randomizeWeeks;
}