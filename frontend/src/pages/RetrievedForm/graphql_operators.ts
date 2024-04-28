export const RETRIEVE_FORM_QUERY = `query RetrieveForm($id: Int!) {
    retrieveForm(id:$id) {
      id
      title
      questions {
        questionNumber
        questionText
        type
        alternatives {
          detail
          isCorrect
        }
      }
    }
  }`;
