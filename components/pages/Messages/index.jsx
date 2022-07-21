import { useCookies } from "react-cookie";
import { MessageStyled } from "./Message.styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTrashCan ,faRotateLeft, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import Cookies from 'cookies'
import { useRouter } from "next/router";

export const Message = ({ userId }) => {
    const [messageInput, setMessageInput] = useState("")
    const [messages, setMessages] = useState([])
    const [cookies, setCookie] = useCookies();
    const [users , setUsers] = useState([])
    const [toId, setToId] = useState(null)
    const [userName, setUserName] = useState("")
    const router = useRouter()
    const lastMsg = useRef();

    const getAllMessages = (toId,userId) => {
        if (toId && userId) {
            fetch("/api/getMessage", { // POINT A
                method:'POST', 
                body: JSON.stringify ({
                    fromId: userId,
                    toId,
                })
            }).then((res) => res.json()).then((data) => {
                setMessages(data);
                lastMsg.current.scrollIntoView({ behavior: "smooth" });
            })
        }
    }

    useEffect(() => {
        getAllMessages(toId,userId);
    }, [toId, userId]);

    useEffect(() => {
        fetch("/api/users").then((res) => res.json()).then((data) => setUsers(data))
    }, []);

    useEffect(() => {
        if (router?.query?.toId) {
            setToId(router.query.toId)
            setUserName(users.find(message => message._id === router.query.toId.toString())?.name)
        }
    }, [router.query, users]);
    
    const deleteMessage = async (idMessage) => {
       const res = await fetch("api/deleteMessage", {
            method:'POST',
            body: JSON.stringify({
                idMessage,
            })
        })
        const deletedMessage = await res.json()
        if (deletedMessage.deletedCount > 0){
            const newMessageList = messages.filter(message => idMessage !== message._id);
            setMessages(newMessageList);
        }  
    }

    const createMessage = async () => {
        const res = await fetch('/api/addMessage', {
            method : 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: messageInput,
                fromId: userId,
                toId,
            })
        });
        const newMessage = await res.json()
        setMessages([...messages, newMessage]);
    }

    return (
        <MessageStyled>
            <div className="hello">{"Bonjour"+ " " + cookies.username} !</div>
            <button 
                style={{
                    display:'flex',
                    margin:'20px auto',     
                }}
                onClick={() => 
                    router.push(
                    {
                        pathname:'/'
                    }
                )}> 
                <FontAwesomeIcon icon={faPerson}/> 
                Changer d{"'"}utilisateur
            </button>
            <div style={{marginLeft:'165px' , marginTop:'100px'}}>

            Envoyer un message à : {" "}
            
            {users.map((user) => {
                if (user._id.toString() !== userId){
                    return (
                        <button
                            style={{ 
                                backgroundColor: toId === user._id.toString() ? 'green' : 'grey',
                                borderRadius:'20px',
                                margin:'5px',
                                padding:'10px'
                            }}
                            key={user._id.toString()}
                            onClick={() => {
                                setUserName(user.name);
                                router.push({
                                    pathname: `/Message` ,
                                    query: {toId : user._id.toString()}
                                })
                            }}
                        >
                            {user.name}
                        </button>
                    )   
                }
            })}
            </div>
            <div className="msg">
                <div className="sender">
                    <span disabled={userName === ""}>{userName}</span>
                </div>

                <div className="right-left">
                    {toId &&
                        <>
                            {messages.map(message => {
                                const date = new Date(message.timestamp)
                                const hours = date.getHours() > 10 ?  date.getHours() : `0${date.getHours()}`
                                const secondes = date.getSeconds() > 10 ?  date.getSeconds() : `0${date.getSeconds()}`
                                const minutes = date.getMinutes() > 10 ?  date.getMinutes() : `0${date.getMinutes()}`
                                const years = date.getFullYear()
                                const months = date.getMonth() > 10 ?  date.getMonth() : `0${date.getMonth()}`
                                const day = date.getDay() > 10 ?  date.getDay() : `0${date.getDay()}`

                                return (
                                    <div key={message._id.toString()} className={`container-message ${message.fromId !== userId ? "container-message--left" : "container-message--right"}`}>
                                        <div className="message">
                                            <p> {userId === message.fromId ? '' : `${userName}:`} {message.message}</p>    
                                            <div className="time">
                                                {day}/{months}/{years}    à {hours}:{minutes}:{secondes} 
                                            </div>
                                        </div>
                                        {message.fromId == userId &&
                                            <div
                                                style={{color:'red', fontSize:'20px'}} 
                                                className="delete-message" 
                                                onClick={() => deleteMessage(message._id)}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </div>
                                        }        
                                    </div>
                                )
                            })}
                            <div ref={lastMsg} />
                        </>
                    }
                </div>
                <div className="inputChamp">
                    <input 
                        disabled={!toId}
                        type="text"
                        placeholder="Envoyez un message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button onClick={createMessage} disabled={!toId}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>  
                    <button onClick={() => getAllMessages(toId, userId)} disabled={!toId}><FontAwesomeIcon icon={faRotateLeft} /> Refresh</button>
                </div>
            </div>
        </MessageStyled>
    )
}
