import React from 'react'
import routes from '@/routes'
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
export default class Content extends React.Component{
    createRoutes(){
        let res = []
        function create(arr){
            arr.map(ele=>{
                res.push(<Route exact key={ele.id} path={ele.path} component={ele.component} />)
                if(ele.children){
                    create(ele.children)
                }
                return false
            })
        }

        routes.map(ele=>{
            create(ele.children)
            return false
        })
        return res
    }
    render(){
        return(
            <div className='my-content'>
               <Switch>
                   {this.createRoutes()}
                   <Redirect from='/*' to='/home'/>
               </Switch>
            </div>
        )
    }
}