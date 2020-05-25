import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react'
import '../../styles/shared.scss';
const Alert = ({ alerts }) => 
    alerts !== null && 
    alerts.length>0 && 
    alerts.map( alert =>(
        <div key = {alert.id} class ={`message ui ${alert.alertType} message` }>
            {alert.msg}
        </div>
));

Alert.propTypes = {
 alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);


