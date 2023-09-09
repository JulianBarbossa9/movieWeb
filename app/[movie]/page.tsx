

import { MovieI } from '@/interface/MovieInterface'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ReturnMovie {
  id?: string
} 


export async function generateStaticParamas() {
  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`)
  const response = await data.json()
  
  return response.results.map(((movie: any) => ({
    movie: String(movie.id)
  })))
}



const  MovieDetail = async ({ params } : any ) => {

  const { movie } = params
  const imgPaht = "https://image.tmdb.org/t/p/original/"


  
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`, {next: {revalidate: 10}}
    )
    const response = await data.json()
    return (
      <div>
        <div className='mt-10'>
          <h2 className='text-3xl'>{response.title}</h2>
          <button className='bg-sky-500 px-4 py-3 my-4 rounded'>
            <Link href={'/'}>return</Link>
          </button>
          <h3>{response.release_date}</h3>
          <h3>Runtime: {response.runtime} minutes</h3>
          <h3 className='text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded'>{response.status}</h3>
          <Image 
            className='my-12 w-full'
            src={imgPaht + response.backdrop_path}
            width={900}
            height={900}
            alt=""
            aria-hidden={true} 
            priority
          />
          <p>{response.overview}</p>
        </div>
      </div>
    )

  } catch (error) {
    console.error("Error fetching movie details:", error)
    return null //
  }
}

export default MovieDetail