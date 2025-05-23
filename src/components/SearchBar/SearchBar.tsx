import styles from './SearchBar.module.css'
import toast from 'react-hot-toast'

interface SearchBarProps {
    onSubmit: (search: string) => void
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
 const handleSearch = (formData: FormData) => {
    const search = formData.get('query') as string

     if (search === '') {
    toast('Please enter your search query.')
    return
     }

 onSubmit(search)
 }

return (
<header className={styles.header}>
  <div className={styles.container}>
    <a
     className={styles.link}    
     href="https://www.themoviedb.org/"
     target="_blank"
     rel="noopener noreferrer"
    >
     Powered by TMDB
    </a>
    <form className={styles.form} action={handleSearch}>
     <input
      className={styles.input}
      type="text"
      name="query"
      autoComplete="off"
      placeholder="Search movies..."
      autoFocus
     />
     <button className={styles.button} type="submit">
      Search
     </button>
    </form>
  </div>
</header>
)    
}


