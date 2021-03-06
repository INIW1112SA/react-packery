import React, {Component} from 'react';
import {
    Input,
    Header,
    Container,
    Menu,
    Segment,
    Sidebar,
    Accordion,
    Grid,
    Image,
    Button,
    Dropdown,
    Dimmer,
    Form
} from 'semantic-ui-react';
import {Link} from 'react-router';
import Cookie from 'react-cookie';
import Questions from './answerbutton/questions.jsx';
// const logger = require('./../../applogger');
import Textarea from 'react-textarea-autosize';
import {Route, Router, hashHistory} from 'react-router';
let Cards = require('./Home');
let Invite = require('./Invite');
import Answerpage from './anspage';
let style = {
    height: 0
};
let Style = {
    marginTop: '5px',
    marginBottom: '5px',
    float: 'left'
};

class NavBar extends Component {
    state = {
        visible: false,
        open: false,
        heading: '',
        statement: '',
        Concept: ''
    }

    componentWillMount() {
        style = {
            height: $(window).height()
        };
    }

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    toggleSideBar() {
        if (this.state.visible) {
            this.setState({
                visible: !this.state.visible
            });
        }
    }

    handleOpen() {
        this.setState({active: true});
    }

    handleClose() {
        this.setState({active: false});
    }

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
        if (this.state.visible) {
            this.toggleVisibility();
        }
    }

    updateheading(evt) {
        this.setState({heading: evt.target.value});
    }
    updatestatement(evt) {
        this.setState({statement: evt.target.value});
    }
    updateConcept(evt) {
        this.setState({Concept: evt.target.value});
    }

    submitstatement() {
        // this.props.value(this.state.heading, this.state.statement, this.state.Concept);
        // logger.debug('inside navBar');
        let data = {
            email: Cookie.load('username'),
            heading: this.state.heading,
            statement: this.state.statement,
            Concept: this.state.Concept
        };
        $.ajax({
            url: 'http://localhost:8080/list/addquestion',
            type: 'POST',
            data: data,
            success: function() {
                // logger.debug('Added statement successfully' + data1);
                /*eslint-disable*/
                alert('Question posted successfully');
                /*eslint-enable*/
                this.setState({active: false});
                // logger.debug(data1);
            }.bind(this),
            error: function() {
                // logger.debug('error occurred on AJAX');
                // logger.debug(err);
            }
        });
    }

    togetherJS() {
        const script = document.createElement('script');
        script.src = 'https://togetherjs.com/togetherjs-min.js';
        document.body.appendChild(script);
        // TogetherJS(this);
    }

    logoutCall() {
        $.ajax({
            url: 'http://localhost:8080/users/logout', type: 'GET',
            // datatype: 'JSON',
            // data:{username :this.state.username,password:this.state.password},
            success: function(res) {
                if (typeof res.redirect === 'string') {
                    window.location.replace(window.location.protocol
                      + '//' + window.location.host + res.redirect);
                }
                // logger.debug(res.responseText);
                // browserHistory.push('/');
            },
            error: function() {
                // alert("error occurred while logging out");
                // logger.debug(err.responseText);
            }
        });
    }

    render() {
        const {visible} = this.state;
        const {activeItem} = this.state;
        const {active} = this.state;
        const backImage = {
            image: Cookie.load('profilepicture')
        };
        // const {open, dimmer} = this.state;
        return (
            <div style={style}>
                <Menu secondary id='divStyle'>
                    <Grid>
                        <Grid.Column width={3}>
<<<<<<< HEAD
                            <Menu.Item icon='list' active={activeItem === 'menu'}  style={{'font-size': 20 + 'px'}}
                              id='divStyle' onClick={this.toggleVisibility}/>
=======
                            <Menu.Item icon='list' active={activeItem === 'menu'}
                              size='small' id='divStyle' onClick={this.toggleVisibility}/>
>>>>>>> 3cbfbbed20ad7fa6e95dfa7755f337653b5c509a
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Link to='/home'>
                                <Image src='./../image/logo.png' name='image'
                                 active= {activeItem === 'image'}
                                  onClick={this.handleItemClick} className='logosize'/>
                            </Link>
                            <Input action='Search' style={Style}
                               placeholder='Search...' className='search'/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Dimmer active={active}
                               onClickOutside={this.handleClose.bind(this)} page>
                                <Header as='h2' icon>
                                    <Header.Subheader>
                                        <Container>
                                            <Form>
                                                <Form.Field>
                                                    <h2 style={{
                                                        marginLeft: -940 + 'px',
                                                        color: 'white'
                                                    }}>
                                                        ASK QUESTION :</h2>
                                                </Form.Field>
                                                <Form.Field>
                                                    <Input onChange={this.updateheading.bind(this)}
                                                       placeholder='Enter Description here...'/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <Textarea
                                                       onChange={this.updatestatement.bind(this)}
                                                       size='large'
                                                        placeholder='Enter statement here ...'/>
                                                </Form.Field>
                                                <Form.Field>
                                                    <Input onChange={this.updateConcept.bind(this)}
                                                       placeholder='Enter Concept here...'/>
                                                </Form.Field>
                                                <div id="errormessage"/>
                                                <Form.Field>
                                                    <Button primary size='large' type='submit'
                                                      value='Submit'
                                                       onClick={this.submitstatement.bind(this)}>
                                                       Submit</Button>
                                                </Form.Field>
                                            </Form>
                                        </Container>
                                    </Header.Subheader>
                                </Header>
                            </Dimmer>
                            <Menu.Menu position='right' style={Style} id='divStyle'>
                                <Menu.Item name='PostQuestion'
                                  active={activeItem === 'PostQuestion'}
                                   id='divStyle' onClick={this.handleOpen.bind(this)}/>
                                   <Link to='/answer'>
                                         <Menu.Item name='Answer' active={activeItem === 'Answer'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                     </Link>
                                <Menu.Item name='chat' active={activeItem === 'chat'}
                                   id='divStyle' onClick={this.togetherJS.bind(this)}/>
                                <Link to='/invite'>
                                    <Menu.Item name='invite' active={activeItem === 'invite'}
                                       id='divStyle' onClick={this.handleItemClick}/>
                                </Link>
                                <Dropdown icon='user' style={backImage}
                                  active={activeItem === 'friends'}
                                   id='divStyle'
                                   onClick={this.handleItemClick}
                                   floating labeled button className='icon'>
                                    <Dropdown.Menu>
                                        <Image src={Cookie.load('profilepicture')} alt='img'/>
                                        <span className='profileColor'>
                                            {Cookie.load('username')}</span>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        </Grid.Column>
                    </Grid>
                </Menu>
<<<<<<< HEAD
                <Sidebar.Pushable as={Segment} >
                    <Sidebar as={Menu} animation='scale down' width='thin' visible={visible}
                      icon='labeled' vertical id='divStyle'>
=======
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='scale down' width='thin'
                       visible={visible} icon='labeled' vertical id='divStyle'>
>>>>>>> 3cbfbbed20ad7fa6e95dfa7755f337653b5c509a
                        <Accordion>
                            <Accordion.Title >
                                <h5 className = 'sidebarFontColor'>Categories</h5>
                            </Accordion.Title>
                            <Accordion.Content>
                                <p>c</p>
                                <p>c++</p>
                            </Accordion.Content>
                            <Accordion.Title>
                                <h5 className = 'sidebarFontColor'>Notification</h5>
                            </Accordion.Title>
                            <Accordion.Title>
                                <h5 className = 'sidebarFontColor'>Setting</h5>
                            </Accordion.Title>
                        </Accordion>
                    </Sidebar>
                    <Sidebar.Pusher onClick={this.toggleSideBar.bind(this)}>
                        <Segment basic>
                            <Router history={hashHistory}>
                                <Route path='/home' component={Cards}/>
                                <Route path='/invite' component={Invite}/>
                                <Route path='/answer' component={Questions}/>
                                <Route path='/anspage' component={Answerpage}/>
                            </Router>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

module.exports = NavBar;
