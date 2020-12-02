import React from 'react'
import '../../App.css'


const sides = [
  'Question',
  'Answer',
  'Visual',
  'Links',
  'Notes',
  'Hint'
]
class StudyCube extends React.Component {

  state = {
    side: ''
  }

  render() {
    return (
      <div className="cube-radio-container">
        <div className="cube-container">
          <div className={`study-cube ${this.state.side || sides[0]}`}>
            <div className="face Question">
              <div className={`face-title ${this.state.side === 'Question' || this.state.side === '' ? '' : 'blur' }`}>Question</div>
              <div 
              className={`face-content ${this.state.side === 'Question' || this.state.side === '' ? '' : 'blur' }`}
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</div>
            </div>
            <div className="face Links">
              <div className={`face-title ${this.state.side === 'Links' ? '' : 'blur' }`}>Links</div>
              <div className={`face-content ${this.state.side === 'Links' ? '' : 'blur' }`}><a rel="noreferrer" target="_blank" href="https://www.w3schools.com/tags/tag_a.asp">Anchor Tag</a></div>
            </div>
            <div className="face Hint">
              <div className={`face-title ${this.state.side === 'Hint' ? '' : 'blur' }`}>Hint</div>
              <div className={`face-content ${this.state.side === 'Hint' ? '' : 'blur' }`}></div>
            </div>
            <div className="face Notes">
              <div className={`face-title ${this.state.side === 'Notes' ? '' : 'blur' }`}>Notes</div>
              <div className={`face-content ${this.state.side === 'Notes' ? '' : 'blur' }`}></div>
            </div>
            <div className="face Visual">
              <div className={`face-title ${this.state.side === 'Visual' ? '' : 'blur' }`}>Visual Aid</div>
              <img src="https://picsum.photos/200/300" alt="random" className={`visual-aid ${this.state.side === 'Visual' ? '' : 'blur' }`}/>
            </div>
            <div className="face Answer">
              <div className={`face-title ${this.state.side === 'Answer' ? '' : 'blur' }`}>Answer</div>
              <div className={`face-content ${this.state.side === 'Answer' ? '' : 'blur' }`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
            </div>
          </div>
        </div>
        <div>
          <ul className="radio-group">
            {sides.map(side => (
                <>
                  <li className="radio-button">
                    <input
                      key={side}
                      type="radio"
                      name="rotate-cube-side"
                      value={side}
                      onChange={() => this.setState({ side })}
                    />
                    <label
                      for={side}>
                        {side}
                    </label>
                  </li>
                </>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}


export default StudyCube;