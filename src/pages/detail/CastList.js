import React, { useEffect, useState } from 'react'

import tmdbApi from './../../api/tmdbApi';
import apiConfig from './../../api/apiConfig';

import { useParams } from 'react-router-dom';

const CastList = props => {

    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.credits(category, props.id);

            setCasts(response.cast.slice(0, 5))
        }
        getCredits();
    }, [category, props.id]);
    
    return (
        <div className="casts">
            {
                casts.map((cast, i) => {
                    const path = `${apiConfig.w500Image(cast.profile_path)}`;
                    return (
                        <div key={i} className="casts__item">
                            <img className='casts__item__img' src={path} alt={cast.name}/>
                            
                            <p className="casts__item__name">{cast.name}</p>
                        </div>
                    )
                }

                )
            }
        </div>
    )
}

export default CastList