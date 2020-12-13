import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setCube(props.cube);
    setSide('Question');
  }, [props.cube])

  return (
    <>
    { cube &&
    <>
      <div className="cube-ctrl-group container-row">
        <ul className="radio-face-group">
          {sides.map(side => (
            <>
              <li 
                key={`list-item-${side}`}
                className="radio-button">
                <input
                  key={`input-item-${side}`}
                  type="radio"
                  name="rotate-cube-side"
                  value={side}
                  id={side}
                  onChange={() => setSide(side)}
                />
                <label
                  key={`label-item-${side}`}
                  className="radio-label"
                  htmlFor={side}>
                    {side}
                </label>
              </li>
            </>
          ))}
        </ul>
        <CubeCtrls cube_id={props.cube_id} />
      </div>
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
            <img src={cube.visual_aid} alt="random" className={`visual-aid ${side === 'Visual' ? '' : 'blur' }`}/>
          </div>
          <div className="face Answer">
            <div className={`face-title ${side === 'Answer' ? '' : 'blur' }`}>Answer</div>
            <div className={`face-content ${side === 'Answer' ? '' : 'blur' }`}>{cube.answer}</div>
          </div>
        </div>
      </div>
    </>
    }
    </>
  )
}



export default StudyCube;