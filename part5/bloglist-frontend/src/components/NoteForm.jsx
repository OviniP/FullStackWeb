const NoteForm = ({title, 
                    author,
                    url,
                    createPost,
                    setTitle,
                    setAuthor,
                    setUrl
                }) => {
    return(
        <form onSubmit={createPost}> 
        <h2>Create New</h2>
        <div>
          Title
          <input type='text' value={title} onChange={setTitle}></input>
        </div>
        <div>
          Author
          <input type='text' value={author} onChange={setAuthor}></input>
        </div>
        <div>
          url
          <input type='text' value={url} onChange={setUrl}></input>
        </div>
        <button type='submit'>Create</button>
      </form>
    )
}
export default NoteForm