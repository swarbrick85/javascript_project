$(() => {
  agents()
})

const agents = () => {
  let userId
  $('.agents').on('click', (e) => {
    e.preventDefault()
    fetch(`${$(".agents").attr("href")}` + `.json`)
      .then(res => res.json())
      .then(data => {
          $('#app-container').html('<h1>Your Agents</h1><br><br>')
          Object.values(data)[0].forEach(agent => {
          let newAgent = new Agent(agent)
          let postHtml = newAgent.formatIndex()
          userId = newAgent.user_id
          $('#app-container').append(postHtml)

        })
        $('#app-container').append(`
          <br>
          <a href="/users/${userId}/agents/new">Create a New Agent</a><br>
          <a href="/users/${userId}">Your Home Page</a><br>
          `)
      })
  })
}

function Agent(agent) {
  this.name = agent["attributes"]["name"]
  this.country_of_origin = agent["attributes"]["country-of-origin"]
  this.id = agent["id"]
  this.user_id = agent["attributes"]["user-id"]
  this.players = agent["relationships"]["players"]
  this.clubs = agent["relationships"]["clubs"]
  this.contracts = agent["relationships"]["contracts"]
  this.user = agent["relationships"]["user"]
}

Agent.prototype.formatIndex = function() {
  let postHtml = `
  <a href="/users/${this.user_id}/agents/${this.id}">${this.name}</a><br>
  `

  return postHtml
}
