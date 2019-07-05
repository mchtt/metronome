import React, { Component } from "react"
import "./Metronome.css"
import click1 from "./click1.wav"
import click2 from "./click2.wav"

class Metronome extends Component {
  state = {
    playing: false,
    count: 0,
    bpm: 120,
    beatsPerMeasure: 4,
    click1: new Audio(click1),
    click2: new Audio(click2),
    color: "red"
  }

  startStop = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer)
      this.setState({
        playing: false,
        color: "red"
      })
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000)
      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      )
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state

    if (count % beatsPerMeasure === 0) {
      this.state.click2.play()
      this.setState({ color: "red" })
    } else {
      this.state.click1.play()
    }
    if (count < beatsPerMeasure) {
      this.setState(state => ({
        count: state.count + 1
      }))
      this.setState({ color: "orange" })
    } else {
      this.setState({ count: 1 })
    }
  }

  handleBpmChange = event => {
    const bpm = event.target.value

    if (this.state.playing) {
      clearInterval(this.timer)
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000)
      this.setState({ count: 0, bpm })
    } else {
      this.setState({ bpm })
    }
  }

  render() {
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{this.state.bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={this.state.bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button
          className="button"
          ref="button"
          style={{ backgroundColor: this.state.color }}
          onClick={this.startStop}
        >
          {this.state.playing ? "STOP" : "START"}
        </button>
      </div>
    )
  }
}
export default Metronome
