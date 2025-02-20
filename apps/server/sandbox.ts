class TTeam {
  constructor(public id: number, public name: string, public score: number) {}
  add(s: number) {
    this.score += s;
  }
}

class TTeamService {
  teams: TTeam[] = [];
  addTeam(team: TTeam) {
    this.teams.push(team);
  }

  findTeam(teamId: number) {
    return this.teams.find((team) => team.id === teamId);
  }

  removeTeam(team: TTeam) {
    const teamIndex = this.teams.findIndex((t) => t.id === team.id);
    if(teamIndex !== -1) delete this.teams[teamIndex];
  }
  doseTeamExist(teamId: number) {
    return this.teams.some((team) => team.id === teamId);
  }
}

class TGame {
  constructor(public team: TTeam | undefined) {}
  addTeam(team: TTeam) {
    this.team = team;
  }
  addScore(score: number) {
    if(this.team) this.team.add(score);
  }
}

const teamService = new TTeamService();
teamService.addTeam(new TTeam(1, "Team 1", 0));
teamService.addTeam(new TTeam(2, "Team 2", 0));
teamService.addTeam(new TTeam(3, "Team 3", 0));

const game = new TGame(teamService.findTeam(1));

game.team = teamService.teams.find((team) => team.id === 1);

const team1 = teamService.teams.find((team) => team.id === 1);
if(team1) 
  team1.add(10);

if(team1)
teamService.removeTeam(team1);

console.log("Game", game);
console.log("Teams", teamService.teams);
