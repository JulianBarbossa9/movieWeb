import React from 'react'
import Link from 'next/link'
import { MovieI } from '@/interface/MovieInterface'
import Image from 'next/image'


const Movie = ( {title, key, id, poster_path, release_date } : MovieI) => {
  
  const imgPaht = "https://image.tmdb.org/t/p/original/"
  // console.log(imgPaht+poster_path)
  return (
    <div key={id}>
      <h3>{title}</h3>
      <h2>{release_date}</h2>
      <Link href={`/${id}`}>
        <Image src={imgPaht + poster_path} alt="" width={500} height={400} aria-hidden={true} priority>

        </Image>
      </Link> 
    </div>
  )
}

export default Movie