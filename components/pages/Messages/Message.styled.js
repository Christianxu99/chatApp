import styled from "styled-components";

export const MessageStyled = styled.div`

    .hello{
        margin-top: 100px;
        max-width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }
    .msg{

        .right-left {
            max-height: 50vh;
            overflow-y: scroll;
            overflow-x: hidden;
            display:flex;
            flex-direction: column;
            padding-left: 10px;
            padding-right: 10px;

            .container-message {
                display: flex;
                align-items: baseline;
                width: 100%;
                position: relative;
                margin: 10px;

                &--right {
                    justify-content: end;
                    p {
                        background-color: lightblue;
                    }
                }

                &--left {
                    justify-content: start;

                    p {
                        background-color: lightgrey;     
                    }            
                }

                .message {
                    p {
                        border-radius: 20px;
                        border: 1px black solid;
                        padding: 10px;
                    }

                    .time {
                        font-size: 13px;
                        padding-bottom: 10px;
                        padding-right: 10px;
                        padding-left: 10px;
                    }  
                }

                .delete-message {
                    margin: 0 10px;
                    cursor: pointer;
                }
            }
        }

        max-width: 80%;
        border: 5px black solid;
        border-radius: 20px;
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
        .sender{
            border-bottom: 2px solid black;
            background-color: lightgrey;
            padding: 20px;
        }
        .inputChamp{
            border-top: 2px solid black;
            background-color: lightgrey;
            padding: 20px;
        }
        input{
            background-color: lightgrey;
        }
    }
`