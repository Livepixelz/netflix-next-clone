import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

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

  const { data: user } = useCurrentUser()

  return (
    <>
      <h1 className="text-5xl">Netflix Clone</h1> 
      <p className="test-white">Logged in as : {user?.email}</p>
      <button className="bg-red-600 p-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-colors" onClick={() => signOut()}>Sign out</button>  
    </>
  ) 
}