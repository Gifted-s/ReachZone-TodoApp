import React, { Component } from 'react'
import { faListUl, faPen, faTrash, faPlus, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from '@sweetalert/with-react'
import {Spinner} from 'reactstrap'
import { ThemeContextProvider } from '../ThemeContext/ThemeContext';
export default class Dashboard extends Component {
    static contextType = ThemeContextProvider
    constructor(props) {
        super(props)
        this.state = {
            lists: [],
            listname: '',
            taskname: '',
            isloading: false
        }
    }

    async componentDidMount() {
        let userexist = JSON.parse(localStorage.getItem('todouser'))
        console.log(userexist)
        if (userexist) {
            fetch(`https://todo-api-241.herokuapp.com/todoapi/get-user/${this.props.location.state.user._id}`, {
                method: 'Get',
                headers: {
                    'Content-type': 'application/json'
                }

            })
                .then((response) => response.json())
                .then(resJson => this.setState({ lists: resJson.lists }))
                .catch(err => err.message)
        }
        else {
            this.props.history.push('/signin')
        }



    }

    handleCreateList = async function () {
        swal(
            <div>

                <label>
                    Enter list name
            </label>
                <input onChange={(e) => this.setState({ listname: e.target.value })} type="text" className="form-control" placeholder="list name" />
            </div>,
            {
                button: {
                    text: "Create List",
                    closeModal: true
                },

            }

        )
            .then(async () => {
                 this.setState({isloading:true})
                if (this.state.listname) {
                    this.setState({isloading:true})
                    const newlists = await fetch(`https://todo-api-241.herokuapp.com/todoapi/create-list/${this.props.location.state.user._id}`, {
                        method: 'Post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            listname: this.state.listname
                        })

                    })
                        .then((response) => response.json())
                        .then(resJson => resJson)
                        .catch(err => err.message)
                    console.log(newlists)
                    if (newlists.error) {
                        this.setState({isloading:false})
                        swal(newlists.message, '', 'error')
                    }
                    else {
                        this.setState({isloading:false})
                        this.setState({listname:''})
                        this.setState({ lists: newlists.lists })
                    }

                }

            })



    }




    handleUpdateList = async function (id) {
        swal(
            <div>

                <label>
                    Update list name
                </label>
                <br />

                <input onChange={(e) => this.setState({ listname: e.target.value })} type="text" className="form-control" placeholder="New list name" />
            </div>,
            {
                button: {
                    text: "Update List",
                    closeModal: true
                },

            }

        )
            .then(async () => {
               
                if (this.state.listname) {
                    this.setState({isloading:true})
                    const newlists = await fetch(`https://todo-api-241.herokuapp.com/todoapi/update-list/${this.props.location.state.user._id}/${id}`, {
                        method: 'Post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            listname: this.state.listname
                        })

                    })
                        .then((response) => response.json())
                        .then(resJson => resJson)
                        .catch(err => err.message)

                    if (newlists.error) {
                        this.setState({isloading:false})
                        swal(newlists.message, '', 'error')
                    }
                    else {
                        this.setState({isloading:false})
                        this.setState({listname:''})
                        this.setState({ lists: newlists.lists })
                    }

                }

            })



    }





    handleUpdateTask = async function (listId, taskId) {
        swal(
            <div>

                <label>
                    Update Task
                </label>
                <br />

                <input onChange={(e) => this.setState({ taskname: e.target.value })} type="text" className="form-control" placeholder="New task name" />
            </div>,
            {
                button: {
                    text: "Update Task",
                    closeModal: true
                },

            }

        )
            .then(async () => {
                
                if (this.state.taskname) {
                    this.setState({isloading:true})
                    const newlists = await fetch(`https://todo-api-241.herokuapp.com/todoapi/update-task/${this.props.location.state.user._id}/${listId}/${taskId}`, {
                        method: 'Post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            updatedTask: this.state.taskname
                        })

                    })
                        .then((response) => response.json())
                        .then(resJson => resJson)
                        .catch(err => err.message)
                    console.log(newlists)
                    if (newlists.error) {
                        this.setState({isloading:false})
                        swal(newlists.message, '', 'error')
                    }
                    else {
                        this.setState({isloading:false})
                        this.setState({taskname:''})
                        this.setState({ lists: newlists.lists })
                    }

                }

            })



    }



    handleDeleteList = async function (id) {
        swal({
            title: "Are you sure?",
            text: `This list would be deleted `,
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                this.setState({isloading:true})
                if (willDelete) {

                    const deleteResponse = await fetch(`https://todo-api-241.herokuapp.com/todoapi/delete-list/${this.props.location.state.user._id}/${id}`, {
                        method: 'Delete',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then((response) => response.json())
                        .then(resJson => resJson)
                        .catch(err => err.message)
                    if (deleteResponse.error) {
                        this.setState({isloading:false})
                        swal(deleteResponse.message, '', 'error')
                    }
                    else {
                        this.setState({isloading:false})
                        swal('', 'List deleted', 'success')
                        this.setState({ lists: deleteResponse.lists })
                    }


                }
            })
    }



    handleDeleteTask = async function (listId, taskId) {
        swal({
            title: "Are you sure?",
            text: `This task would be deleted `,
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    this.setState({isloading:true})
                    const deleteResponse = await fetch(`https://todo-api-241.herokuapp.com/todoapi/delete-task/${this.props.location.state.user._id}/${listId}/${taskId}`, {
                        method: 'Delete',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then((response) => response.json())
                        .then(resJson => resJson)
                        .catch(err => err.message)
                    if (deleteResponse.error) {
                        this.setState({isloading:false})
                        swal(deleteResponse.message, '', 'error')
                    }
                    else {
                        this.setState({isloading:false})
                        swal('', 'Task deleted', 'success')

                        this.setState({ lists: deleteResponse.lists })
                    }


                }
            })
    }


    handleAddTask = async function (id) {
        swal(
            <div>

                <label>
                    Enter task
            </label>
                <input onChange={(e) => this.setState({ taskname: e.target.value })} type="text" className="form-control" placeholder="Enter task" />
            </div>,
            {
                button: {
                    text: "Add task",
                    closeModal: true
                },

            }

        )
            .then(async () => {

                if (this.state.taskname) {
                    this.setState({isloading:true})
                    const newlists = await fetch(`https://todo-api-241.herokuapp.com/todoapi/add-task/${this.props.location.state.user._id}/${id}`, {
                        method: 'Post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            task: this.state.taskname
                        })

                    })
                        .then((response) => response.json())
                        .then(resJson => resJson)
                        .catch(err => err.message)
                    
                    if (newlists.error) {
                        this.setState({isloading:false})
                        swal(newlists.message, '', 'error')
                    }
                    else {
                        this.setState({isloading:false})
                        this.setState({taskname:''})
                        this.setState({ lists: newlists.lists })
                    }

                }

            })



    }
    render() {
        let { changeTheme, theme } = this.context
        let user = {}
        if (this.props.location.state) {
            user = this.props.location.state.user
        }
        else {
            user = { name: null }
        }



        return (
            <div className={`container-fluid  p-0 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-secondary'} todo-cont`}>
                <nav className={`todonav ${theme === 'dark' ? 'bg-dark text-light' : 'bg-dark text-light'}`}>
                    <h5 className="">Welcome {user.name}  </h5>

                    <div className="check_cont">
                        <span className="dark">Dark Mode</span>
                        <input style={{ height: 16, width: 16, cursor: 'pointer' }} className="ml-2" onChange={() => changeTheme()} type='checkbox' />
                    </div>
                    <div onClick={() => swal({
                        title: "Are you sure?",
                        text: ` `,
                        icon: "info",
                        buttons: true,
                        dangerMode: true,
                    }).then(() => {
                        localStorage.clear('tododata')
                        this.props.history.push('/signin')
                    })
                    }
                        style={{ float: 'right', marginTop: -30, cursor: 'pointer' }}>
                        <span className="logout">Logout <FontAwesomeIcon icon={faArrowCircleRight} /> </span>
                    </div>

                </nav>
                <div className="col-md-12 col-sm-12">
                    {
                        this.state.isloading && <div className="row justify-content-center mt-1">
                        <Spinner/>
                      </div>
                    }
                    
                    <div style={{ width: 230 }} className="list-no mt-1">
                        Number of Lists <span className="badge badge-primary">{this.state.lists.length}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="row mt-3">
                        <button onClick={() => this.handleCreateList()} className="btn btn-primary mr-4">
                            Create List <FontAwesomeIcon icon={faListUl} />
                        </button>
                    </div>

                    {
                        this.state.lists.length > 0 ?
                            <div className="row p-2 mt-3">
                                {
                                    this.state.lists.map((list) => {
                                        return (
                                            <div key={list.id} className={`col-md-3 col-sm-12`}>
                                                <div className={`task-container ${theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-secondary'}`}>

                                                    <div className={`${theme === 'dark' ? 'bg-secondary text-light' : 'bg-light text-secondary'}`}>
                                                        <h5 className="pl-4 pt-4 pb-4 pr-2"> {list.listname} <span style={{ fontSize: 10 }} className="ml-2 badge badge-primary">{list.tasks.length} tasks</span>  <span style={{ float: 'right' }} onClick={() => this.handleDeleteList(list.id)} className="btn btn-sm p-1 btn-secondary"><FontAwesomeIcon style={{ width: 12, height: 12 }} icon={faTrash} /></span> <span style={{ float: 'right' }} onClick={() => this.handleUpdateList(list.id)} className="btn mr-2 btn-sm p-1  btn-secondary"><FontAwesomeIcon style={{ width: 12, height: 12 }} icon={faPen} /></span>  </h5>
                                                    </div>
                                                    {
                                                        list.tasks.map((task, index) => {
                                                            return (
                                                                <div key={task.taskId} className="task pl-4 pr-2">
                                                                    <p className="task-text"><span className="">({index + 1})</span> {task.task} <span style={{ float: 'right' }} onClick={() => this.handleDeleteTask(list.id, task.taskId)} className="btn btn-sm  btn-light"><FontAwesomeIcon icon={faTrash} style={{ width: 12, height: 12, color: 'rgba(0,0,0,0.6)' }} /></span> <span style={{ float: 'right' }} onClick={() => this.handleUpdateTask(list.id, task.taskId)} className="btn mr-2 btn-sm  btn-light"><FontAwesomeIcon icon={faPen} style={{ width: 12, height: 12, color: 'rgba(0,0,0,0.6)' }} /></span>  </p>
                                                                    <hr />
                                                                </div>
                                                            )

                                                        })
                                                    }



                                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="row mt-3">
                                                        <button onClick={() => this.handleAddTask(list.id)} className="btn btn-primary mt-4 mb-2 mr-4">
                                                            Add task <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            :
                            <p className={`pretext ${theme === 'dark' ? 'text-light' : ' text-dark'}`}> Click on the "Create List" button to create a list</p>
                    }

                </div>
            </div>
        )
    }
}
