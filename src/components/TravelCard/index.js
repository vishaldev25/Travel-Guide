import './index.css'

const TravelCard = props => {
  const {travelDetails} = props
  const {name, imageUrl, description} = travelDetails

  return (
    <li className="list-items">
      <img src={imageUrl} alt={name} className="image" />
      <div className="text-cont">
        <h2 className="place-heading">{name}</h2>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}

export default TravelCard
