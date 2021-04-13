import styled from 'styled-components';
import {auth, db} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import {useRouter} from 'next/router'
import {useState} from 'react'
import {Avatar, debounce, IconButton} from '@material-ui/core'
import Head from 'next/head'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useCollection} from 'react-firebase-hooks/firestore';
import Message from './Message'
import firebase from 'firebase'


function ChatScreen({chat,messages}) {

    const [user] = useAuthState(auth)
    const router = useRouter()
    const [input, setInput] = useState('');
    const [mesasgesSnapshot]=useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'))

    const sendMesage =(e)=>{

        e.preventDefault()
        db.collection('users').doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp()
        },{
            merge:true
        });

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoUrl:user.photoURL
        });

        setInput('')
    }
    const showMessages =()=>{
        if (mesasgesSnapshot){
            return mesasgesSnapshot.docs.map((message)=>(

                <Message 

                key = {message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp:message.data().timestamp?.toDate().getTime(),
                }}
                
                 />

            ))
        }else{
            return JSON.parse(messages).map((message)=>(
                <Message 

                key={message.id}
                user={message.user}
                message={message}
                
                 />
            )
        )
    }
}

    return (
        <Container>
           <Header>

                <Avatar />

                <HeaderInfo>
                    <h3>Rec Email</h3>
                    <p> Last seen ...</p>
                </HeaderInfo>


                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>


                </HeaderIcons>
           </Header>

           <MessageContainer>

                  {showMessages()} 
               <EndMessage />
           </MessageContainer>

           <InputContainer>
               <InsertEmoticonIcon />

               <Input value={input} onChange={(e)=>setInput(e.target.value)} />

                <button hidden disabled={!input} type="submit" onClick={sendMesage}>Send Message</button>
               <MicIcon />

           </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`


`

const Header = styled.div`
position:sticky;
background-color:white;
z-index:100;
top:0;
display:flex;   
padding:11px;
height:80px;
align-items:center;
border-bottom:1px solid whitesmoke;
margin-left:9%

`

const HeaderInfo = styled.div`
margin-left:15px;
flex:1;

> h3 {
    margin-bottom:3px;

}

> p {
    font-size:14px;
    color:gray
    
}

`

const HeaderIcons = styled.div`


`

const MessageContainer = styled.div `
padding:30px;
background-color:#e5ded8;
min-height:90vh;


`

const EndMessage = styled.div`



`

const InputContainer = styled.form`

display:flex;
align-items:center;
padding:15px;
position:sticky;
bottom:0;
background-color:whitesmoke;
z-index:100;


`

const Input = styled.input`

flex:1;
outline:0;
padding:20px;
border:none;
border-radius:10px;
margin-left:15px;
margin-right:15px;
background-color:white;


`
