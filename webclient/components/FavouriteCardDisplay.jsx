import React from 'react';
import CardsComponent from './FavouriteCardStructure.jsx';
import {Grid, Icon} from 'semantic-ui-react';
class DisplayFavComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            start: 0,
            end: 3
        };
    }

    changeStartRight() {
        let start;
        let end;
        if (this.state.start + 4 > this.props.json.length) {
            start = 0;
            end = 0;
        } else {
            start = this.state.start + 4;
        }
        if (this.state.end + 4 > this.props.json.length) {
            end = this.props.json.length;
        } else {
            end = this.state.end + 4;
        }
        if (start === 0) {
            end = 3;
          }
        this.setState({start: start, end: end});
    }
    changeStartLeft() {
        let start = 0;
        if (this.state.start - 4 < 0) {
            start = 0;
        } else {
            start = this.state.start - 4;
        }
        let end = this.state.end - 4;
        this.setState({start: start, end: end});
    }

    render() {
        let displayImage = [];
        for (let i = this.state.start; i <= this.state.end; i = i + 1) {
            if (typeof this.props.json[i] !== 'undefined') {
                displayImage.push(this.props.json[i]);
            }
        }
        let Data = displayImage.map(function(item) {
            return (
                <Grid.Column>
                    <CardsComponent displayImage={item.displayImage}/>
                </Grid.Column>
            );
        });
        return (
          <div className = 'favbg'>
            <Grid centered>
                <Grid.Column width={2} className='arrowsize'>
                    <Icon name='chevron left' onClick={this.changeStartLeft.bind(this)}/>
                </Grid.Column>
                <Grid.Column width={6} centered>
                    <Grid centered columns={4}>
                        {Data}
                    </Grid>
                </Grid.Column>
                <Grid.Column width={2} className='arrowsize'>
                    <Icon name='chevron right' onClick={this.changeStartRight.bind(this)}/>
                </Grid.Column>
            </Grid>
          </div>
        );
    }
  }
  DisplayFavComponent .propTypes = {
   json: React.PropTypes.func
 };
  module.exports = DisplayFavComponent;
