import Form from '../components/workForm'

const NewWork = () => {
  const workForm = {
    title: '',
    year: '',
  }

  return <Form formId="add-work-form" workForm={workForm} />
}

export default NewWork