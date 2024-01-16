import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelCard from '../TravelCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Travel extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    travelList: [],
  }

  componentDidMount() {
    this.getTravelDetails()
  }

  getTravelDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    if (response.ok === true) {
      const data = await response.json()
      const updated = data.packages.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        description: each.description,
        name: each.name,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        travelList: updated,
      })
    } else {
      console.log('INvalid')
    }
  }

  renderTraveDetails = () => {
    const {travelList} = this.state

    return (
      <>
        <ul>
          {travelList.map(each => (
            <TravelCard key={each.id} travelDetails={each} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTotal = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderTraveDetails()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="app">
          <h1 className="heading">Travel Guide</h1>
          <div className="details">{this.renderTotal()}</div>
        </div>
      </div>
    )
  }
}
export default Travel
