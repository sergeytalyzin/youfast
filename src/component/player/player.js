import React from 'react';


const Player = ({id}) => {

    return (
        <div className="player">
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>

    );
};

export default Player;