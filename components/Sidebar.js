import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ChatIcon from '@material-ui/icons/Chat';
import Chat from '../components/Chat'
import { Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';
import {auth, db, provider} from '../firebase'

function Sidebar() {

    const [user] = useAuthState(auth)

    const userChatRef = db.collection('chats').where('users','array-contains',user.email)

    const [ChatSnapshot] = useCollection(userChatRef)

    const signout=()=>{
        auth.signOut()
        
    }

    const createChat=()=>{

        const input = prompt('Please enter an email');

        if(!input){
            return;
        }

        if(EmailValidator.validate(input) && !chatExists(input) && input!==user.email){
            console.log('validated');

            db.collection('chats').add({
                users:[user.email,input],
            })
        }else{
            console.log('not validated');
        }
    };

    const chatExists=(recipient)=>

        !!ChatSnapshot?.docs.find((chat)=>chat.data().users.find((u)=>u===recipient)?.length>0)

    

    return (
        <div>
          <Container>

            <Header>

                <UseAvatar src={user.photoURL} onClick={signout} />

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

        {ChatSnapshot?.docs.map(chat=>(
            <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
        ))}
            
        </Container>
        </div>
    )
}

export default Sidebar;

const Container =styled.div` 

flex:0.45;
border-right:1px solid whitesmoke;
height:100vh;
min-width:300px;
max-width:350px;
overflow-y:scroll;
::-webkit-scrollbar{
    display:none;
}

-ms-overflow-style:none;
scrollbar-width:none;

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