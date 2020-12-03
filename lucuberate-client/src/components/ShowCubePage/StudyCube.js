import React, { useState, useEffect } from 'react';
import '../../App.css'


const sides = [
  'Question',
  'Answer',
  'Visual',
  'Links',
  'Notes',
  'Hint'
]

function StudyCube(props) {
  const [side, setSide] = useState('');
  const [cube, setCube] = useState({});

  useEffect(() => {
    setCube(props.cube)
  }, [props.cube])

  return (
    <>
    { cube &&
    <div className="study-cube cube-radio-container">
      <div className="cube-container">
        <div className={`study-cube ${side || sides[0]}`}>
          <div className="face Question">
            <div className={`face-title ${side === 'Question' || side === '' ? '' : 'blur' }`}>Question</div>
            <div 
            className={`face-content ${side === 'Question' || side === '' ? '' : 'blur' }`}
            >{cube.question}</div>
          </div>
          <div className="face Links">
            <div className={`face-title ${side === 'Links' ? '' : 'blur' }`}>Links</div>
            <div className={`face-content ${side === 'Links' ? '' : 'blur' }`}><a rel="noreferrer" target="_blank" href="https://www.w3schools.com/tags/tag_a.asp">Anchor Tag</a></div>
          </div>
          <div className="face Hint">
            <div className={`face-title ${side === 'Hint' ? '' : 'blur' }`}>Hint</div>
            <div className={`face-content ${side === 'Hint' ? '' : 'blur' }`}></div>
          </div>
          <div className="face Notes">
            <div className={`face-title ${side === 'Notes' ? '' : 'blur' }`}>Notes</div>
            <div className={`face-content ${side === 'Notes' ? '' : 'blur' }`}></div>
          </div>
          <div className="face Visual">
            <div className={`face-title ${side === 'Visual' ? '' : 'blur' }`}>Visual Aid</div>
            <img src="https://picsum.photos/200/300" alt="random" className={`visual-aid ${side === 'Visual' ? '' : 'blur' }`}/>
          </div>
          <div className="face Answer">
            <div className={`face-title ${side === 'Answer' ? '' : 'blur' }`}>Answer</div>
            <div className={`face-content ${side === 'Answer' ? '' : 'blur' }`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
          </div>
        </div>
      </div>
      <div>
        <ul className="radio-face-group">
          {sides.map(side => (
              <>
                <li className="radio-button">
                  <input
                    key={side}
                    type="radio"
                    name="rotate-cube-side"
                    value={side}
                    id={side}
                    onChange={() => setSide(side)}
                  />
                  <label
                    htmlFor={side}>
                      {side}
                  </label>
                </li>
              </>
          ))}
        </ul>
      </div>
    </div>
    }
    </>
  )
}



export default StudyCube;