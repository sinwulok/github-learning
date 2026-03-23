import React from 'react';

class DemoClock extends React.Component
{
  state = {
    time: "12:34",
    ampm: "AM",
  }

  componentDidMount() {
    setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString('en-US');
      const timeParts = timeString.split(" ");
      const currentTime = timeParts[0];
      const ampm = timeParts[1];

      this.setState({
        currentTime: currentTime,
        ampm: ampm,
      });

    }, 1000)
  }

  
 
  render() {

    return (
      
      <div className="min-h-screen bg-slate-300 flex justify-center items-center">
        <div className="bg-black rounded-xl text-7xl text-emerald-400 py-12 px-20 font-mono flex items-center border-slate-100 border-8 shadow-xl">
          <span>{this.state.currentTime}</span>
          <div className="ml-3 flex flex-col text-3xl leading-7">
            <span className={``}>AM</span>
            <span className={`
              ${this.state.ampm === "PM" ? "" : 'text-emerald-950'}
            `}>PM</span>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoClock;