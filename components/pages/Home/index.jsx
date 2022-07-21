import Head from 'next/head'
import { CookiesProvider  , useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { HomeStyled } from "./Home.Styled";
import { useEffect, useState } from 'react'

export const Home = () => {
  const [cookies, setCookie] = useCookies(['id']);
  const [users , setUsers] = useState([])
  const router = useRouter()
  useEffect(() => {
    fetch("/api/users").then((res) => res.json()).then((data) => setUsers(data))
  }, []);
  return (
    <CookiesProvider>
      <HomeStyled>
        <div className="home">
          <Head>
            <title>Application de messagerie</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <h1>Bienvenue !</h1>
          <p>Veuillez vous identifier</p>
            {users.map(user => <button key={user._id.toString()} onClick={() => {
            setCookie('userid', user._id.toString());
            setCookie('username', user.name.toString());
            router.push(
              {
                pathname:'/Message',
              },
              '/Message',
            )
          }}>
            {user.name}
          </button>
          )}
        </div> 
      </HomeStyled>
    </CookiesProvider>
  )
}
