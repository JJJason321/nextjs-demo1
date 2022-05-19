import React from 'react'
import MainHeader from './mainHeader'


const Layout = (props) => {
  return (
    <React.Fragment>
        <MainHeader />
        <main >{props.children}</main>
    </React.Fragment>
  )
}

export default Layout