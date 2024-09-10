import React from 'react'

interface IWidgetCard {
    src: string,
    alt: string,
    style: string
}

const Icon: React.FC<IWidgetCard> = ({ src, alt, style }) => {
    return (
        <img src={src} alt={alt} className={style} />
    )
}

export default Icon