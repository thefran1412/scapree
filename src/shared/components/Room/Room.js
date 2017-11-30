import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './room.css'
import StarRatingComponent from 'react-star-rating-component'

export default class Room extends Component {
  render () {
    const info = this.props.info
    const img = `/static/uploads/${info.profileImg}`
    const group = '/static/media/group_white.svg'
    const clock = '/static/media/clock_white.svg'

    let difficulty = '/static/media/'
    let difficultyAlt = ''

    if (info.difficulty <= 33) {
      difficulty += 'easy.svg'
      difficultyAlt = 'Facil'
    } else if (info.difficulty <= 66) {
      difficulty += 'medium.svg'
      difficultyAlt = 'Medio'
    } else {
      difficulty += 'hard.svg'
      difficultyAlt = 'Dificil'
    }
    return (
      <div className='room'>
        <Link to={`/room/${this.props.info._id}`} className='roomLink'>
          <div className='roomPoster' style={{backgroundImage: `url(${img})`}}>
            <div className='features'>
              <div className='otherInfo'>
                <div>
                  <img src={group} width='15' title={`De ${info.minPeople} a ${info.maxPeople} personas`} alt='Personas' />
                  <p>{info.minPeople}-{info.maxPeople}</p>
                </div>
                <div>
                  <img src={clock} width='15' title={info.duration + ' minutos'} alt='Tiempo' />
                  <p>{info.duration}'</p>
                </div>
                <div>
                  <img src={difficulty} title={difficultyAlt} alt={difficultyAlt} width='15' />
                  <p>{difficultyAlt}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className='roomInfo'>
          <Link to={`/room/${this.props.info._id}`} className='roomNameLink'>
            <div className='basicInfo'>
              <h4>{this.props.info.name}</h4>
              <StarRatingComponent
                name='stars'
                starCount={5}
                value={4}
                starColor={'#c34a4a'}
                emptyStarColor={'#e0e0e0'}
                editing={false}
              />
            </div>
          </Link>
          {
            (this.props.from === 'home')
            ? (<div className='bottomRight'>
              <Link className='bottomRightButton' to={`/room/edit/${this.props.info._id}`}>Edit</Link>
            </div>)
            : ''
          }
        </div>
      </div>
    )
  }
}
