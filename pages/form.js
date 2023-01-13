import Form from '../components/workForm'

const NewWork = () => {
  const workForm = {
    title: '',
    year: '',
    images: {
      uri: '',
      width: '',
      height: '',
      alt: '',
    }
  }

  return <Form formId="add-work-form" workForm={workForm} />
}

export default NewWork