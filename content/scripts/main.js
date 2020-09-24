requirejs.config({
  paths: {
    jquery: 'jquery.min',
    espn: 'espn.min'
  }
});

requirejs([
  'jquery',
  'espn'
], function($, espnApi) {
  async function init() {
    const { Client } = espnApi;
    const client = new Client({ leagueId: 605173 }); // TODO: correct league id

    var weekOfYear = function(date){
      var d = new Date(+date);
      d.setHours(0,0,0);
      d.setDate(d.getDate()+4-(d.getDay()||7));
      return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+7)/7);
    };
    var d = new Date();
    var year = d.getFullYear();
    var week = weekOfYear(Date.now()) - 37; // starts in sept
    const league = await client.getLeagueInfo({seasonId: year});
    var matchups = league.scheduleSettings.numberOfRegularSeasonMatchups;
    const teams = await client.getTeamsAtWeek({seasonId: year, scoringPeriodId: week});
    const boxscoreForWeek = await client.getBoxscoreForWeek({ seasonId: year, matchupPeriodId: week, scoringPeriodId: week});

    // players
    var players = [];

    for (var i = 0; i < boxscoreForWeek.length; i++) {
      var box = boxscoreForWeek[i];
      players.push(box.homeRoster);
      players.push(box.awayRoster);
    }

    var allPlayers = [].concat.apply([], players);
    var highestPlayer = allPlayers[0];
    for (var i = 0; i < allPlayers.length; i++) {
      var player = allPlayers[i];
      if (player.position != "Bench") {
        if (player.totalPoints > highestPlayer.totalPoints) {
          highestPlayer = player;
        }
      }
    }
    if (highestPlayer.totalPoints != 0) {
      $('.stat--mvp .name').text(highestPlayer.player.fullName);
      $('.stat--mvp .owner').text(highestPlayer.player.proTeam);
      $('.stat--mvp .wins').text(highestPlayer.player.defaultPosition);
      $('.stat--mvp .score').text(Number(highestPlayer.totalPoints.toFixed(1)));
    }
    console.log(highestPlayer);

    // stats
    var lowestTeamScore = Number.POSITIVE_INFINITY;
    var highestTeamScore = Number.NEGATIVE_INFINITY;
    var teamScore;
    var lowestTeamName;
    var highestTeamName;
    var lowestTeamOwner;
    var highestTeamOwner;
    var lowestTeamPercent;
    var highestTeamPercent;
    for (var i = 0; i < teams.length; i++) {
      var team = teams[i];
      teamScore = team.totalPointsScored;
      if (teamScore < lowestTeamScore) {
        lowestTeamScore = Number(teamScore.toFixed(1));
        lowestTeamName = team.name;
        lowestTeamOwner = team.abbreviation;
        lowestTeamPercent = team.winningPercentage;
      }
      if (teamScore > highestTeamScore) {
        highestTeamScore = Number(teamScore.toFixed(1));
        highestTeamName = team.name;
        highestTeamOwner = team.abbreviation;
        highestTeamPercent = team.winningPercentage;
      }
    }
    $('.stat--high .name').text(highestTeamName);
    $('.stat--high .score').text(highestTeamScore);
    $('.stat--high .owner').text(highestTeamOwner);
    $('.stat--high .percent').text(highestTeamPercent);
    $('.stat--low .name').text(lowestTeamName);
    $('.stat--low .score').text(lowestTeamScore);
    $('.stat--low .owner').text(lowestTeamOwner);
    $('.stat--low .percent').text(lowestTeamPercent);

    // score header
    $('#season').text(year);
    $('#week').text(week);

    // boxscores
    // console.log(boxscoreForWeek);
    for (var i = 0; i < boxscoreForWeek.length; i++) {
      var box = boxscoreForWeek[i];
      var home;
      var away;
      var leader;
      box.homeTeamId === 12 || box.homeTeamId === 13 ? home = teams[box.homeTeamId - 2] : home = teams[box.homeTeamId - 1];
      box.awayTeamId === 12 || box.awayTeamId === 13 ? away = teams[box.awayTeamId - 2] : away = teams[box.awayTeamId - 1];
      box.homeScore > box.awayScore ? leader = 'leader--home' : '';
      box.awayScore > box.homeScore ? leader = 'leader--away' : '';
      $('.el--boxscores').append('<div class="boxscore '+leader+'">'+
                                  '<div class="team home">'+
                                  '<div class="logo"><img class="img" src="'+home.logoURL+'"/></div>'+
                                    '<div class="info">'+
                                      '<div class="name">'+home.name+'</div>'+
                                      '<div class="record">('+home.wins+'-'+home.losses+', '+home.homeWins+'-'+home.homeLosses+' home) <span class="seed">'+home.playoffSeed+' </span></div>'+
                                    '</div>'+
                                    '<div class="score">'+box.homeScore+'</div>'+
                                  '</div>' +
                                  '<div class="team away">'+
                                    '<div class="logo"><img class="img" src="'+away.logoURL+'"/></div>'+
                                    '<div class="info">'+
                                      '<div class="name">'+away.name+'</div>'+
                                      '<div class="record">('+away.wins+'-'+away.losses+', '+away.awayWins+'-'+away.homeLosses+' away) <span class="seed">'+away.playoffSeed+' </span></div>'+
                                    '</div>'+
                                    '<div class="score">'+box.awayScore+'</div>'+
                                  '</div>' +
                                '</div>'
                              );
    }
  }

  init();

});
