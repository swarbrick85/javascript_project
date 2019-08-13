$(() => {
  create_agent()
})

const create_agent = () => {
  $('.new_agent').on('submit', function(e) {
    e.preventDefault()
    $('#app-container').html(`a`)
console.log($(this).serialize())
  })
}
