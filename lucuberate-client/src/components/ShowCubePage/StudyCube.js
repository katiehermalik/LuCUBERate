import React, { useState, useEffect, useRef } from 'react';
import CubeCtrls from './CubeCtrls';
import '../../App.css';


const sides = [
  'Question',
  'Answer',
  'Visual',
  'Link',
  'Notes',
  'Hint'
]

function StudyCube(props) {
  const [side, setSide] = useState('');
  const [cube, setCube] = useState({});

  // creating refs dynamically when mapping radio buttons 
  const createRef = []
  sides.forEach(() => createRef.push(React.createRef()))
  const refs = useRef(createRef)

  useEffect(() => {
    setCube(props.cube);
    // when cube changes, side and checked radio btn changes to 'question'
    setSide('Question');
    sides.forEach((side, i) => {
      if (i === 0) refs.current[i].current.checked = true;
      else refs.current[i].current.checked = false;
    })
  }, [props.cube])

  return (
    <>
    { cube &&
    <>
      <div className="cube-ctrl-group container-row">
        <ul className="radio-face-group">
          {sides.map((side, i) => (
              <li 
                key={`list-item${side}`}
                className="radio-button">
                <input
                  type="radio"
                  name="rotate-cube-side"
                  value={side}
                  id={side}
                  ref={refs.current[i]}
                  onChange={() => setSide(side)}
                />
                <label
                  className="radio-label"
                  htmlFor={side}>
                    {side}
                </label>
              </li>
          ))}
        </ul>
        <CubeCtrls cube_id={props.cube_id} />
      </div>
      <div className="cube-area">
        <div className="cube-container">
          <div className={`study-cube ${side || sides[0]}`}>
            <div className="face Question">
              <div className={`face-title ${side === 'Question' || side === '' ? '' : 'blur' }`}>Question</div>
              <div 
              className={`face-content ${side === 'Question' || side === '' ? '' : 'blur' }`}
              >{cube.question}</div>
            </div>
            <div className="face Link">
              <div className={`face-title ${side === 'Link' ? '' : 'blur' }`}>Link</div>
              <div className={`face-content ${side === 'Link' ? '' : 'blur' }`}><a rel="noreferrer" target="_blank" href={cube.link}>{cube.link_alias}</a></div>
            </div>
            <div className="face Hint">
              <div className={`face-title ${side === 'Hint' ? '' : 'blur' }`}>Hint</div>
              <div className={`face-content ${side === 'Hint' ? '' : 'blur' }`}>{cube.hint}</div>
            </div>
            <div className="face Notes">
              <div className={`face-title ${side === 'Notes' ? '' : 'blur' }`}>Notes</div>
              <div className={`face-content ${side === 'Notes' ? '' : 'blur' }`}>{cube.notes}</div>
            </div>
            <div className="face Visual">
              <div className={`face-title ${side === 'Visual' ? '' : 'blur' }`}>Visual Aid</div>
              {cube.visual_aid &&
              <img src={`/uploads/${cube.visual_aid}`} alt="random" className={`visual-aid ${side === 'Visual' ? '' : 'blur' }`}/>
              }
            </div>
            <div className="face Answer">
              <div className={`face-title ${side === 'Answer' ? '' : 'blur' }`}>Answer</div>
              <div className={`face-content ${side === 'Answer' ? '' : 'blur' }`}>{cube.answer}</div>
            </div>
          </div>
        </div>
      </div>
    </>
    }
    </>
  )
}



export default StudyCube;