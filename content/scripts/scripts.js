
$(document).ready(function() {
  var html = $('html');
  var menuToggle = $('.menu__toggle');

  // functions
  loogHistory();
  carousel();

  // menu toggle
  menuToggle.click(function(){
    html.toggleClass("menu-open");
  });

  // accordion
  var accordionBtn = $('.item--accordion .btn');

  accordionBtn.click(function(){
    var btn = $(this);
    var content = btn.siblings('.content');
    var allContent = accordionBtn.siblings('.content');
    var expanded = btn.hasClass('expanded');

    if (expanded){
      btn.removeClass('expanded');
      content.slideUp();
    } else {
      accordionBtn.removeClass('expanded');
      btn.addClass('expanded');
      allContent.slideUp();
      content.slideDown();
    }
  });

});

// accordion
function accordion(){
  var item = $('.item--accordion');
}

// carousel
function carousel(){
  $('.carousel').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    cssEase: 'linear',
    dots: true,
    adaptiveHeight: true
  });
}

// create champ list
function loogHistory() {

  let champions = [
    {
      year: '2021',
      team: "Montgomery Burns' Hiney",
      manager: 'Geoff Hoss'
    },
    {
      year: '2020',
      team: "Dreckige Hure",
      manager: 'Brody Steineck'
    },
    {
      year: '2019',
      team: "Two Charger RBs One Cup",
      manager: 'Wesley Derrick'
    },
    {
      year: '2018',
      team: "Back Door Lutz 9",
      manager: 'Mark Stickney'
    },
    {
      year: '2017',
      team: "Gordon Bailey Elementary",
      manager: 'Tyler Hammarsten'
    },
    {
      year: '2016',
      team: "The Zeke Squade",
      manager: 'Mark Stickney'
    },
    {
      year: '2015',
      team: "CornJulioNeed TDs4MyBunghole",
      manager: 'Michael Seidel'
    },
    {
      year: '2014',
      team: "The Spaghetti Rapist",
      manager: 'Mark Stickney'
    },
    {
      year: '2013',
      team: 'Khal DeMarco',
      manager: 'Patrick Kerrigan'
    },
    {
      year: '',
      team: '',
      manager: ''
    }
  ]

  let poopstacks = [
    {
      year: '2021',
      team: "**",
      manager: 'Brody Steineck'
    },
    {
      year: '2020',
      team: "The Bums",
      manager: 'Nick Scarrella'
    },
    {
      year: '2019',
      team: "`08 Detroit Lions",
      manager: 'Tyler Hammarsten'
    },
    {
      year: '2018',
      team: "Poop Stack",
      manager: 'Wes Derrick'
    },
    {
      year: '2017',
      team: "2 Poops In The Potty",
      manager: 'Michael Musser'
    },
    {
      year: '2016',
      team: "Mr Jones and Me",
      manager: 'Tyler Hammarsten'
    },
    {
      year: '2015',
      team: "No Mention",
      manager: 'Wes Derrick'
    },
    {
      year: '2014',
      team: 'No Mention',
      manager: 'Tom Femrite'
    },
    {
      year: '2013',
      team: 'No Mention',
      manager: 'Jeff Sarberg'
    },
    {
      year: '',
      team: '',
      manager: ''
    }
  ]

  let cup = [
    {
      year: '2021 Winners',
      team: "Nick Scarrella, Patrick Kerrigan, Kevin Kerrigan, Chad Prater",
      manager: 'none'
    }
  ]

  var list;
  var html = document.getElementsByTagName('html');
  const page = html[0].id;

  if (page === 'champions') {
    list = champions;
  } else if (page === 'poopstacks'){
    list = poopstacks;
  } else {
    list = cup;
  }

  $(list).each(function(index, element) {

    if (index === 0) {

      var plaque = $('<div class="el el--plaque">' +
                        '<div class="plaque__text"></div>' +
                      '</div>'
                    ).appendTo('.club--champion');

      var pt = plaque.find('.plaque__text');

      pt.append(
        $(document.createElement('div')).text(this.year).addClass('year')
      );
      pt.append(
        $(document.createElement('div')).text(this.team).addClass('name')
      );
      pt.append(
        $(document.createElement('div')).text(this.manager).addClass('manager')
      );

    } else if (this.year === '') {
      var plaque = $('<div class="el el--plaque spacer"></div>').appendTo('.club--past');
    } else {

      var plaque = $('<div class="el el--plaque">' +
                        '<div class="plaque__text"></div>' +
                      '</div>'
                    ).appendTo('.club--past');

      var pt = plaque.find('.plaque__text');

      pt.append(
        $(document.createElement('div')).text(this.year).addClass('year')
      );
      pt.append(
        $(document.createElement('div')).text(this.team).addClass('name')
      );
      pt.append(
        $(document.createElement('div')).text(this.manager).addClass('manager')
      );

    }
  });
}
