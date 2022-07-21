import { Message } from '../components/pages/Messages'
import Cookies from 'cookies'


export default function MessagePage({ userId }){
   return <Message userId={userId} />
}

export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res)
    return { props: { userId: cookies.get('userid') }}
}
