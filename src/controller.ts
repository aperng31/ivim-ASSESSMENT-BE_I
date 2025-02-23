class NotesController {
  getNotes = async (req, res) => {
    res.send('helloworld from controller!');
  }
}

export default new NotesController()