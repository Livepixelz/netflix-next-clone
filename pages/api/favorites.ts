import { NextApiRequest, NextApiResponse } from 'next'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(405).end()

    try {

        const { currentUser: { favoriteIds } } = await serverAuth(req, res)

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: favoriteIds
                }
            }
        })

        res.status(200).json(favoriteMovies)

    } catch(e) {
        console.log(e)
        res.status(400).end()
    }
}