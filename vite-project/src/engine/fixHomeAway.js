import { analyzeHomeAway } from "./analyzeHomeAway";

// ======================================================
//                MAIN OPTIMIZATION FUNCTION
// ======================================================
export function fixHomeAway(firstRound, teams, options = {}) {
  const maxIterations = options.maxIterations ?? 3000;
  const allowedStreak = options.maxStreak ?? 3;

  let current = deepCopy(firstRound);
  let currentScore = scoreSchedule(current, teams, allowedStreak);

  let best = deepCopy(current);
  let bestScore = currentScore;

  for (let iter = 0; iter < maxIterations; iter++) {
    const candidate = deepCopy(current);

    if (Math.random() < 0.3) swapMatchesBetweenWeeks(candidate);
    if (Math.random() < 0.5) flipWorstStreak(candidate, teams, allowedStreak);

    const candScore = scoreSchedule(candidate, teams, allowedStreak);

    const acceptProb = Math.exp((currentScore - candScore) / 5);

    if (candScore < currentScore || Math.random() < acceptProb) {
      current = candidate;
      currentScore = candScore;

      if (candScore < bestScore) {
        best = deepCopy(candidate);
        bestScore = candScore;
      }
    }
  }

  cleanupStreaks(best, teams, allowedStreak);

  console.log("BEST SCORE:", bestScore);
  return best;
}

// ======================================================
//                     UTILITIES
// ======================================================
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function rand(n) {
  return Math.floor(Math.random() * n);
}

// ======================================================
//           MUTATION 1: Swap matches between weeks
// ======================================================
function swapMatchesBetweenWeeks(schedule) {
  const w1 = rand(schedule.length);
  let w2 = rand(schedule.length);
  while (w1 === w2) w2 = rand(schedule.length);

  const m1 = schedule[w1].matches;
  const m2 = schedule[w2].matches;

  if (!m1.length || !m2.length) return;

  const i1 = rand(m1.length);
  const i2 = rand(m2.length);

  const A = m1[i1];
  const B = m2[i2];

  const th = A.homeTeamId;
  const ta = A.awayTeamId;
  A.homeTeamId = B.homeTeamId;
  A.awayTeamId = B.awayTeamId;
  B.homeTeamId = th;
  B.awayTeamId = ta;
}

// ======================================================
//      MUTATION 2: Flip match in the worst streak
// ======================================================
function flipWorstStreak(schedule, teams, allowedStreak) {
  const map = analyzeHomeAway(schedule, teams);

  let worstTeam = null;
  let worstStart = 0;
  let worstEnd = 0;
  let worstLen = 0;

  for (const id in map) {
    const seq = map[id];
    let start = 0;

    for (let i = 1; i <= seq.length; i++) {
      if (i === seq.length || seq[i] !== seq[start]) {
        const len = i - start;
        if (len > worstLen) {
          worstLen = len;
          worstTeam = id;
          worstStart = start;
          worstEnd = i - 1;
        }
        start = i;
      }
    }
  }

  if (!worstTeam || worstLen <= 1) return;

  const mid = Math.floor((worstStart + worstEnd) / 2);
  const info = findMatchBySeqIndex(schedule, worstTeam, mid);
  if (!info) return;

  const match = info.match;

  const oldHome = match.homeTeamId;
  match.homeTeamId = match.awayTeamId;
  match.awayTeamId = oldHome;
}

// ======================================================
//     FIND MATCH BY INDEX IN TEAM'S HOME/AWAY SEQUENCE
// ======================================================
function findMatchBySeqIndex(schedule, teamId, seqIndex) {
  const idNum = Number(teamId);

  let counter = 0;

  for (let w = 0; w < schedule.length; w++) {
    for (const match of schedule[w].matches) {
      if (match.homeTeamId === idNum || match.awayTeamId === idNum) {
        if (counter === seqIndex) {
          return { week: w, match };
        }
        counter++;
      }
    }
  }
  return null;
}

// ======================================================
//          FINAL CLEANUP: REMOVE STREAKS ≥ 4
// ======================================================
function cleanupStreaks(schedule, teams, allowedStreak) {
  const maxFixes = 2000;

  for (let fix = 0; fix < maxFixes; fix++) {
    const map = analyzeHomeAway(schedule, teams);

    let fixedSomething = false;

    for (const teamId in map) {
      const seq = map[teamId];

      let start = 0;
      for (let i = 1; i <= seq.length; i++) {
        if (i === seq.length || seq[i] !== seq[start]) {
          const len = i - start;

          if (len > allowedStreak) {
            breakOneStreak(schedule, teamId, start, i - 1);
            fixedSomething = true;
            break;
          }

          start = i;
        }
      }

      if (fixedSomething) break;
    }

    if (!fixedSomething) return;
  }
  console.warn(
    "Fix limit!"
  );
}

function breakOneStreak(schedule, teamId, startIndex, endIndex) {
  const mid = Math.floor((startIndex + endIndex) / 2);
  const info = findMatchBySeqIndex(schedule, teamId, mid);
  if (!info) return;

  const match = info.match;

  const oldHome = match.homeTeamId;
  match.homeTeamId = match.awayTeamId;
  match.awayTeamId = oldHome;
}

// ======================================================
//                SCORE FUNCTION
// ======================================================
function scoreSchedule(schedule, teams, allowedStreak) {
  const map = analyzeHomeAway(schedule, teams);
  let total = 0;

  for (const id in map) {
    total += scoreTeamSequence(map[id], allowedStreak);
  }

  return total;
}

// ======================================================
//             SCORING OF A SINGLE TEAM SEQUENCE
// ======================================================
function scoreTeamSequence(sequence, allowedStreak) {
  let score = 0;
  let home = 0;
  let away = 0;

  let run = 1;
  let prev = sequence[0];

  for (let i = 0; i < sequence.length; i++) {
    const ch = sequence[i];

    if (ch === "H") home++;
    else away++;

    if (i > 0) {
      if (ch === prev) run++;
      else {
        score += streakPenalty(run, allowedStreak);
        run = 1;
      }

      if (ch !== prev) score -= 0.05;
    }

    prev = ch;
  }

  score += streakPenalty(run, allowedStreak);

  return score;
}

function streakPenalty(len, allowedStreak) {
  if (len <= allowedStreak) return 0;

  if (len === allowedStreak + 1) return 500;
  return 1000 + (len - allowedStreak) * 500;
}
