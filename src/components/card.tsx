type CardProps = {
    cardImage?: string,
    cardTitle: string,
    cardContent: string,
}

const Card = ({
    cardImage,
    cardTitle,
    cardContent,
}: CardProps) => {
    const hasCardImage = cardImage ?? false
    const hasCardTitle = cardTitle ?? false
    return (
        <>
            <div className="card">
                {hasCardImage && (<img className="card-img-top" src={cardImage} alt={cardImage.alt} />)}
                {hasCardTitle && (<h5 className="card-header">{cardTitle}</h5>)}

                <div className="card-body">
                    <div className="card-text" dangerouslySetInnerHTML={{ __html: cardContent }}></div>
                </div>
            </div>
        </>
    )
}
export default Card