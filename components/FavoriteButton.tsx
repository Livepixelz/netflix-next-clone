import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const Icon = isFavorite ? <AiOutlineCheck className="text-white" size={25} /> : <AiOutlinePlus className="text-white" size={25} />

    const toggleFavorite = useCallback(async () => {
        let response;
        
        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data : { movieId } });
        } else {
            response = await axios.post('/api/favorite', { movieId });
        }

        const updateFavoriteIds = response?.data?.favoriteIds

        mutate({
            ...currentUser,
            favoriteIds: updateFavoriteIds
        })
        mutateFavorites();

    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
    
    return (
        <div onClick={toggleFavorite} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            {Icon}
        </div>
    )
}

export default FavoriteButton;