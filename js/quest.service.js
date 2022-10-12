const STORAGE_KEY = 'questsDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null


function createQuestsTree() {
  
  // var questsTree  = loadFromStorage(STORAGE_KEY)
  var questsTree = gQuestsTree
  if (!questsTree) {
    questsTree = createQuest('Male?')
    questsTree.yes = createQuest('Gandhi')
    questsTree.no = createQuest('Rita')
  }

  gQuestsTree = questsTree
  gCurrQuest = gQuestsTree
  gPrevQuest = null
  _saveQuestsToStorage()
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gPrevQuest[res]
  return gCurrQuest
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest
  _saveQuestsToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function resetQuestsTree() {
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function _saveQuestsToStorage() {
  saveToStorage(gQuestsTree)
}


