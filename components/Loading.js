
import { Grid } from '@material-ui/core'
import {
    
    Circle,
    
  } from 'better-react-spinkit'

function Loading() {


    return (
        <div>
            <center style={{display:"grid",placeItems:"center",height:"100vh"}}>
                <div>
                    <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"  alt="" height={200}
                        style={{marginBottom:10}}
                    />

                    <Circle color="#3cbc28" size={60}/>
                </div>
            </center>
        </div>
    )
}

export default Loading

