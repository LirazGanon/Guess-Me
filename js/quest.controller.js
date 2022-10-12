'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)


function init() {
  $('.year').text(new Date().getFullYear())
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()

  renderQuest()
  // TODO: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.someone-res').text(getCurrQuest().txt)
      $('#successModal').modal('show');
      // TODO: improve UX
      onRestartGame()
    } else {
      $('#failedModal').modal('show');
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
      
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  $('#newGuess').removeClass('is-invalid')
  $('#newQuest').removeClass('is-invalid')
  if (!newGuess.trim()){
    $('#newGuess').addClass('is-invalid')
    return
  }
  var newQuest = $('#newQuest').val()
  if(!newQuest.trim()){
    $('#newQuest').addClass('is-invalid')
    return 
  }

  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  var newGuess = $('#newGuess').val('')
  var newQuest = $('#newQuest').val('')

  onRestartGame()
}


function onRestartGame() {
  $('.quest').hide()
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null
  resetQuestsTree()
}
