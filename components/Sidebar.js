import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import Chat from '@material-ui/icons/Chat';
import { Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';

function Sidebar() {

    const createChat=()=>{

        const input = prompt('Please enter an email');

        if(!input){
            return;
        }

        if(EmailValidator.validate(input)){
            console.log('validated');
        }else{
            console.log('not validated');
        }
    };


    return (
        <div>
          <Container>

            <Header>

                <UseAvatar />

                <IconsContainer>

                <IconButton>

                    <ChatIcon />

                </IconButton>
                    

                <IconButton>

                    <MoreVertIcon />

                </IconButton>
                   
             </IconsContainer>

            

        </Header>

        <Search>

            <SearchIcon />
            <SearhInput placeholder="Search in chats" />

        </Search>

        <SidebarButton onClick={createChat}> Start a new chat </SidebarButton>
            
        </Container>
        </div>
    )
}

export default Sidebar;

const Container =styled.div` 


`

const Header =styled.div` 

display:flex;
position:sticky;
top:0;
background-color:white;
z-index:1;
justify-content:space-between;
align-center:center;
padding:15px;
height:80px;
border-bottom:1px solid whitesmoke

`;


const UseAvatar =styled(Avatar)`
cursor:pointer;

:hover{
    opacity:0.8;
}


`

const IconsContainer=styled.div`



`

const Search=styled.div`
display:flex;
align-center:center;
padding:20px;
border-radius:5px;



`


const SearhInput = styled.input`
outline-width:0;
border:none;
flex:1;



`

const SidebarButton = styled(Button) `  
width:100%;

&&&{
    border-bottom:1px solid whitesmoke
    border-top:1px solid whitesmoke
}



`