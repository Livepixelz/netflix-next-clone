import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import Navbar from "@/components/Navbar"
import Billboard from "@/components/Billboard"
import MovieList from "@/components/MovieList"
import InfoModal from "@/components/InfoModal"
import useFavorites from "@/hooks/useFavorites" 
import useMovieList from "@/hooks/useMovieList"
import useInfoModalStore from "@/hooks/useInfoModalStore"

export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Page() {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModalStore()

  return (
    <>
      <Navbar />
      <Billboard />
      <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="pb-40">
        <MovieList title="Trending now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  ) 
}