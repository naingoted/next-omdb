import Nav from '../Header/Nav';

const Layout = ({children}) => {
    return (
        <div className="wrapper">
            <Nav/>
            <main className="main">
            {children}
            </main>
        </div>
    )
}

export default Layout