import React from 'react'

function PreviewCard(props) {
  return (
    <div className='card-container' key={props.CardKey} style={{ backgroundImage: `url(${props.CardImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
     {/* <img className='card-image' src={props.CardImg} alt={props.CardName} /> */}
     <div className='card-text-container'>
      <div className='card-text'>
      <p>{props.CardName}</p>
      {/* <p>{props.CardType}</p> */}
      </div>
     </div>
    </div>
  )
}

export default PreviewCard