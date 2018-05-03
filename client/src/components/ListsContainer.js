import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import NewListForm from './NewListForm';
import EditListForm from './EditListForm';
import update from 'immutability-helper';

class ListsContainer extends Component {
    constructor(props){
      super(props)
      this.state = {
        lists: [],
        editingListId: null
      }
      this.addNewList = this.addNewList.bind(this)
      this.removeList = this.removeList.bind(this)
      this.editingList = this.editingList.bind(this)
      this.editList = this.editList.bind(this)
    }

    componentDidMount() {
      axios.get('api/v1/lists.json')
      .then(response => {
        console.log(response)
        this.setState({
          lists: response.data
        })
      })
      .catch(error => console.log(error))
    }

    addNewList(title, excerpt) {
      axios.post('/api/v1/lists', {list: {title, excerpt}})
      .then(response => {
        console.log(response)
        const lists = update(this.state.lists, 
          {$splice:[[0,0,response.data]]})
        this.setState({lists})
      })
      .catch(error => {
        console.log(error)
      })
    }

    removeList(id){
      axios.delete(`/api/v1/lists/${id}`)
      .then(response => {
        const lists = this.state.lists.filter(
          list => list.id !== id
        )
        this.setState({lists})
      })
      .catch(error => console.log(error))
    }

    editingList(id) {
      this.setState({
        editingListId: id
      }, () => {this.title.focus()})
    }

    editList(id, title, excerpt) {
      axios.put('/api/v1/lists/'+id, {
        list: {
          title,
          excerpt
        }
      })
      .then(response => {
        console.log(response)
        const listIndex = this.state.lists.findIndex( x => x.id === id)
        const lists = update(this.state.lists, 
          {[listIndex]: { $set: response.data}})
        this.setState({
          lists: lists,
          editingListId: null
        })
      })
      .catch(error => console.log(error))
    }

    render() {
        return (
          <div>
            <NewListForm onNewList={this.addNewList} />
            <div className="lists-container">
            {this.state.lists.map( list => {
              if (this.state.editingListId === list.id){
                return (<EditListForm 
                  list={list}
                  key={list.id}
                  editList={this.editList}
                  titleRef={input => this.title = input}
                />)
              } else {
                return (<List 
                  list={list} 
                  key={list.id} 
                  onRemoveList={this.removeList}
                  editingList={this.editingList}
                />)
              }
            })}
            </div>
          </div>
        )
    }
}
export default ListsContainer;