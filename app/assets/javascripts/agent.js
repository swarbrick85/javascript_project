$(() => {
  agent()
})

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
