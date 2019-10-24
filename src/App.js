import React from "react";
import Terminal from "./components/Terminal";
import Info from "./components/Info";
import BrowserEmulator from "./components/BrowserEmulator";
import Resume from "./components/Resume";

const intro = `Hello, I hope you have a nice day!
I am Sukh Raj Limbu, senior standing at SRM IST studying Computer Science.
Please hit ENTER to learn more about me `;
const error = `bash: command not found`;
const cdErrors = [`cd: not a directory: `, `cd: no such file or directory:`];
const openErrors = [
  `open: please enter a file name`,
  `open: not a file: `,
  `open: not such file in this directory: `
];
const data = {
  sorablaze_11: "Experience Projects About",
  Experience: `NextTechLab.txt`,
  Projects: ``,
  About: ``
};
const ExperienceData = {
  "NextTechLab.txt": {
    title: "NextTech Lab",
    detail: [
      `Student Reasercher @ Minsky Lab`,
      `Worked with other students on various projects mainly related to Machine Learning and Deep Learning.`,
      `Student run multi-disciplinary lab of SRM Universiry. The lab has a fundimg of $5k from the University and has more than 100+ members and associates with it.`
    ]
  }
};
const doNotRegisters = [
  "Meta",
  "Alt",
  "Control",
  "Shift",
  "Caps",
  "LockTab",
  "ArrowRight",
  "ArrowLeft",
  "ArrowDown",
  "ArrowUp"
];

class App extends React.Component {
  state = {
    firstEnter: false,
    text: "~/sorablaze_11 > ",
    lineCommand: "",
    currDirectoryText: "~/sorablaze_11",
    currDirectory: "sorablaze_11",
    filesOpened: [],
    indexes: {
      terminal: -1,
      browser: 1
    }
  };

  handleKeyPress = event => {
    event.preventDefault();
    if (event.key === "Enter") {
      if (this.state.firstEnter === false) {
        this.setState({ firstEnter: true });
      } else {
        if (this.state.lineCommand.includes("ls")) {
          if (this.state.lineCommand !== "ls")
            this.setState({
              text: `${this.state.text} \n ${error} \n ${this.state.currDirectoryText} > `
            });
          else {
            this.setState({
              text: `${this.state.text} \n ${
                data[this.state.currDirectory]
              } \n ${this.state.currDirectoryText} > `
            });
          }
        } else if (this.state.lineCommand.includes("cd")) {
          const cd = this.state.lineCommand.split(" ");
          if (cd.length !== 2)
            this.setState({
              text: `${this.state.text} \n ${error} \n ${this.state.currDirectoryText} > `
            });
          else {
            if (cd[1] === ".." || cd[1] === "../") {
              if (this.state.currDirectory !== "sorablaze_11") {
                this.setState({
                  currDirectory: "sorablaze_11",
                  currDirectoryText: "~/sorablaze_11"
                });
              }
              this.setState({
                text: `${this.state.text} \n ${this.state.currDirectoryText} > `
              });
            } else {
              if (cd[1].includes("txt")) {
                this.setState({
                  text: `${this.state.text} \n ${cdErrors[0]} ${cd[1]} \n ${
                    this.state.currDirectoryText
                  } > `
                });
              } else if (!data[this.state.currDirectory].includes(cd[1])) {
                this.setState({
                  text: `${this.state.text} \n ${cdErrors[1]} ${cd[1]} \n ${
                    this.state.currDirectoryText
                  } > `
                });
              } else {
                this.setState({
                  text: `${this.state.text} \n ${
                    this.state.currDirectoryText
                  }/${cd[1]} > `,
                  currDirectoryText: `${this.state.currDirectoryText}/${cd[1]}`,
                  currDirectory: cd[1]
                });
              }
            }
          }
        } else if (this.state.lineCommand.includes("open")) {
          this.bringToBack();
          const open = this.state.lineCommand.split(" ");
          if (open.length !== 2)
            this.setState({
              text: `${this.state.text} \n ${openErrors[0]} \n ${
                this.state.currDirectoryText
              } > `
            });
          else {
            if (!open[1].includes(".txt"))
              this.setState({
                text: `${this.state.text} \n ${openErrors[1]} ${open[1]} \n ${
                  this.state.currDirectoryText
                } > `
              });
            else if (!data[this.state.currDirectory].includes(open[1]))
              this.setState({
                text: `${this.state.text} \n ${openErrors[2]} ${open[1]} \n ${
                  this.state.currDirectoryText
                } > `
              });
            else {
              this.setState({
                filesOpened: this.state.filesOpened.concat(open[1]),
                text: `${this.state.text} \n ${this.state.currDirectoryText} > `
              });
            }
          }
        } else if (this.state.lineCommand.includes("clear")) {
          this.setState({ text: `${this.state.currDirectoryText} > ` });
        } else if (this.state.lineCommand === "") {
          this.setState({
            text: `${this.state.text} \n ${this.state.currDirectoryText} > `
          });
        } else {
          this.setState({
            text: `${this.state.text} \n ${error} \n ${this.state.currDirectoryText} > `
          });
        }
        this.setState({ lineCommand: "" });
      }
    } else if (event.key === "Backspace") {
      this.state.lineCommand !== "" &&
        this.setState({
          text: this.state.text.substring(0, this.state.text.length - 1),
          lineCommand: this.state.lineCommand.substring(
            0,
            this.state.lineCommand.length - 1
          )
        });
    } else if (event.key === "Tab") {
      event.preventDefault();
      if (
        this.state.lineCommand.includes("cd") ||
        this.state.lineCommand.includes("open")
      ) {
        const files = data[this.state.currDirectory].split(" ");
        const fileName = this.state.lineCommand.split(" ");
        fileName.length === 2 &&
          files.forEach(el => {
            const temp = el.substring(0, fileName[1].length).toLowerCase();
            if (
              temp === fileName[1].toLowerCase() &&
              temp !== "" &&
              fileName !== ""
            ) {
              this.setState({
                text:
                  this.state.text.substring(
                    0,
                    this.state.text.length - temp.length
                  ) + el,
                lineCommand: `${fileName[0]} ${el}`
              });
            }
          });
      }
    } else if (!doNotRegisters.includes(event.key)) {
      this.setState({
        text: this.state.text + event.key,
        lineCommand: this.state.lineCommand + event.key
      });
    }
  };

  bringToFront = () => {
    this.setState({
      indexes: {
        terminal: 1,
        browser: -1
      }
    });
  };

  bringToBack = () => {
    this.setState({
      indexes: {
        terminal: -1,
        browser: 1
      }
    });
  };

  handleCloseBrowser = () => {
    let newArr = this.state.filesOpened;
    newArr.length > 1 ? newArr.pop() : (newArr = []);
    this.setState({ filesOpened: newArr });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    return (
      <div>
        {this.state.firstEnter === false ? (
          <Terminal
            text={intro}
            running={true}
            index={this.state.indexes.terminal}
            onChangeIndex={this.bringToFront}
          />
        ) : (
          <Terminal
            text={this.state.text}
            running={false}
            index={this.state.indexes.terminal}
            onChangeIndex={this.bringToFront}
          />
        )}
        <Info />
        <Resume />
        {this.state.filesOpened !== [] &&
          this.state.filesOpened.map((el, i) => {
            return (
              <BrowserEmulator
                key={i}
                title={el}
                data={ExperienceData[el]}
                index={this.state.indexes.browser}
                onChangeIndex={this.bringToBack}
                onCloseBrowser={this.handleCloseBrowser}
              />
            );
          })}
      </div>
    );
  }
}

export default App;
