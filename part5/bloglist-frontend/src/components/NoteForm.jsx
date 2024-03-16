import {useState} from 'react'
const NoteForm = ({createPost}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addPost = (event) => {
        event.preventDefault()

        const newPost = {
            title,
            author,
            url
        }
        createPost(newPost)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <form onSubmit={addPost}> 
        <h2>Create New</h2>
        <div>
          Title
          <input type='text' value={title} onChange={({target}) => setTitle(target.value)}></input>
        </div>
        <div>
          Author
          <input type='text' value={author} onChange={({target}) => setAuthor(target.value)}></input>
        </div>
        <div>
          url
          <input type='text' value={url} onChange={({target}) => setUrl(target.value)}></input>
        </div>
        <button type='submit'>Create</button>
      </form>
    )
}
export default NoteForm