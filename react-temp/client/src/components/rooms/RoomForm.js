import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect} from 'react-redux'
import { addRoom } from '../../actions/room'


const RoomForm = ({addRoom}) => {

    const [formData, setFormData] = useState({
        name: ''
    })

    const { name } = formData;


    const onChange = e =>  setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
            <form 
            onSubmit={e=>{
            e.preventDefault();
            addRoom({ ...formData,});
            setFormData({
                name: ''
            })
            
        }}
            className="form my-1 post-form">
                <div className="form-group">
                    <input type="text" 
                           placeholder="Room name" 
                           name="name" 
                           value={name} 
                           onChange={e=>onChange(e)}
                           autoComplete="off"
                           required 
                    />
                </div>
                <input type="submit" className="btn btn-dark my-1 post-submit" defaultValue="Submit" />
            </form>

    )
}

RoomForm.propTypes = {
    addRoom: PropTypes.func.isRequired
}

export default connect(null,{ addRoom })(RoomForm)