import React from 'react';
import { Button } from 'react-bootstrap';
import ListItem from './ListItem';
import axios from 'axios';

export default function List(props) {
  async function handleSave() {
    if (!props.myTaps.length) {
      alert('nothing to save');
    }

    let saveList = props.myTaps.map((tap) => {
      return {
        mymizu_id: tap.id,
        name: tap.name,
        longitude: tap.longitude,
        latitude: tap.latitude,
        address: tap.address,
        comment: tap.comment,
        photo_url: tap.photo_url,
      };
    });
    console.log(saveList);

    // API call to insert list to db...
    let result = await axios.post('/api/mytaps', saveList);
    console.log(result);
  }

  function handleDelete(id) {
    props.setMyTaps(props.myTaps.filter((tap) => tap.id !== id));
  }

    return (
        <div>
            <h2>My locations</h2>
            <Button
                className="blue-button"
                onClick={handleSave}
            >
                Save
            </Button>
            <div className="taps-list">
                {props.myTaps.length && props.myTaps.map((tap) => <ListItem tap={tap} handleDelete={handleDelete} />)} 
            </div>
        </div>
    )
}
