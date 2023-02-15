export const FORMS_QUERY = `query {
    forms {
        id
        title
    }
}`;

export const CREATE_FORM_MUTATION = `mutation CreateForm ($title: String!, $questions: [QuestionInput]!) {
    createForm(formData: { title: $title, questions: $questions }) {
        form {
            id
            title
        }
      }
}`;

export const DELETE_FORM_MUTATION = `mutation DeleteForm ($id: ID!) {
    deleteForm (id: $id) {
      success
    }
  }`