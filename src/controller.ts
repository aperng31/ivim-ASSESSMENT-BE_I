class NotesController {
  getNotes = async (req, res) => {
    res.send('helloworld from controller!');
  }

  getNoteById = async (req, res) => {
    res.send('note id: ' + req.params.id)
  }

  createNote = async (req, res) => {
    console.log(req.params.id, req.body.description);
    res.send('create note: ' + req.body.description)
  }

  updateNote = async (req, res) => {
    res.send('update note id: ' + req.params.id + req.body.description)
  }

  deleteNote = async (req, res) => {
    res.send('delete note id: ' + req.params.id)
  }
}

export default new NotesController()