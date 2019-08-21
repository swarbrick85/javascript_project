$(() => {
  agents()
})

$(() => {
  agent()
})

$(() => {
  create_agent()
})

$(() => {
  alphabetize()
})

const agents = () => {
  let userId
  $('.agents').on('click', (e) => {
    e.preventDefault()
    fetch(`${$(".agents").attr("href")}` + `.json`)
      .then(res => res.json())
      .then(data => {
          $('#app-container').html('<h1>Your Agents</h1><br>')
          Object.values(data)[0].forEach(agent => {
          let newAgent = new Agent(agent)
          let agentHtml = newAgent.formatIndex()
          userId = newAgent.user_id
          $('#app-container').append(agentHtml)

        })
        $('#app-container').append(`
          <br>
          <a href="/users/${userId}/agents/new">Create a New Agent</a><br>
          <a href="/users/${userId}">Your Home Page</a><br>
          `)
      })
  })
}

const alphabetize = () => {
  let userId
  $('#alphabetize').on('click', (e) => {
    e.preventDefault()
    fetch(`${$("#alphabetize").attr("href")}` + `.json`)
      .then(res => res.json())
      .then(data => {
          $('#app-container').html('<h1>Your Agents</h1><br>')
          let agents = Object.values(data)[0]
          agents.sort(function(a, b) {
              var nameA = a["attributes"]["name"].toUpperCase();
              var nameB = b["attributes"]["name"].toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });

          agents.forEach(agent => {
          let newAgent = new Agent(agent)
          let agentHtml = newAgent.formatIndex()
          userId = newAgent.user_id
          $('#app-container').append(agentHtml)

        })
        $('#app-container').append(`
          <br>
          <a href="/users/${userId}/agents/new">Create a New Agent</a><br>
          <a href="/users/${userId}">Your Home Page</a><br>
          `)
      })
  })
}

const agent = () => {
  $('#agent0').on('click', (e) => {
    e.preventDefault()
    fetch(`${$("#agent0").attr("href")}` + `.json`)
      .then(res => res.json())
      .then(data => {
          $('#app-container').html(``)
          let agent = new Agent(Object.values(data)[0])
          let players = agent["players"]["data"]
          $('#app-container').append(`<h1>${agent["name"]}</h1>`)
          $('#app-container').append(`<p>Country of Origin: ${agent["country_of_origin"]}</p>`)
          $('#app-container').append(`<br><h3>Players</h3>`)
          players.forEach(player => {
            p = new Player(player)
          $('#app-container').append(p.formatShow())
        })
        })

      })
  }

  const create_agent = () => {
    $('#new_agent').on('submit', function(e) {
      e.preventDefault()
      const values = $(this).serialize()

      $.post(`/users/${this["agent[user_id]"]["value"]}/agents`, values)
        .done(function(data) {
          $('#app-container').html(``)
          let agent = new Agent(Object.values(data)[0])
          $('#app-container').append(`<h1>${agent["name"]}</h1>`)
          $('#app-container').append(`<p>Country of Origin: ${agent["country_of_origin"]}</p>`)
        })
    })
  }

function Agent(agent) {
  this.name = agent["attributes"]["name"]
  this.country_of_origin = agent["attributes"]["country-of-origin"]
  this.id = agent["id"]
  this.user_id = agent["attributes"]["user-id"]
  this.players = agent["relationships"]["players"]
  }

  function Player(player) {
    this.id = player.id
    this.name = player["name"]
    this.user_id = player["user-id"]
  }

  Player.prototype.formatShow = function() {
    let playerHtml = `
      <p>${this.name}</p>
    `
    return playerHtml
  }

Agent.prototype.formatIndex = function() {
  let agentHtml = `
  <a href="/users/${this.user_id}/agents/${this.id}">${this.name}</a><br>
  `

  return agentHtml
}
