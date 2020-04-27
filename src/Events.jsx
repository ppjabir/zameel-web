import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import Modal from "react-bootstrap/Modal";
import 'react-big-calendar/lib/css/react-big-calendar.css';

//import globalize from 'globalize';
//import moment from 'moment'

export const Events = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const events = [
        {
          id: 0,
          title: 'റമളാൻ വിജ്ഞാന വേദി I സക്കാത്ത് നാമറിയേണ്ടത്.',
          start: new Date(2020, 3, 27, 9, 0, 0),
          end: new Date(2020, 3, 27, 13, 0, 0),
          eventDetails: {
            venue:"Mumbai",
            speaker:"Kunjimuhammad Madani Parappur",
            youtube:"https://www.youtube.com/embed/zdak21K2VJQ"

          },
          resourceId: 1,
        },
        {
            id: 12,
            title: 'റമദാൻ നമുക്കെന്തൊക്കെ തരും?',
            start: new Date(2020, 3, 27, 15, 0, 0),
            end: new Date(2020, 3, 27, 18, 20, 0),
            eventDetails: {
              venue:"bangalore",
              speaker:"Muhammed Kutty Salafi",
              youtube:"https://www.youtube.com/embed/zdak21K2VJQ"
  
            },
            resourceId: 3,
          },
        {
          id: 1,
          title: 'റമദാനിലൂടെ സ്വർഗ്ഗത്തിലേക്ക്',
          allDay: false,
          start: new Date(2020, 3, 29, 14, 0, 0),
          end: new Date(2020, 3, 29, 16, 30, 0),
          eventDetails: {
            venue:"Kozhikode",
            speaker:"thwalhath swalahi",
            youtube:"https://www.youtube.com/embed/zdak21K2VJQ"

          },
          resourceId: 2,
        },
        {
          id: 2,
          title: 'ഇ-മദ്റസ:റമദാൻ വിശേഷങ്ങൾ',
          start: new Date(2020, 3, 29, 8, 30, 0),
          end: new Date(2020, 3, 29, 12, 30, 0),
          eventDetails: {
            venue:"Malappuram",
            speaker:"Thajudheen Swalahi",
            youtube:"https://www.youtube.com/embed/zdak21K2VJQ"

          },
          resourceId: 3,
        },
        {
          id: 11,
          title: 'ആർക്കാണ് നോമ്പ് നിർബന്ധം',
          start: new Date(2020, 3, 30, 7, 0, 0),
          end: new Date(2020, 3, 30, 10, 30, 0),
          eventDetails: {
            venue:"Sharjah",
            speaker:"Hussain Salafi",
            youtube:"https://www.youtube.com/embed/zdak21K2VJQ"

          },
          resourceId: 3,
        },
      ]
      
      const resourceMap = [
        { resourceId: 1, resourceTitle: 'track1' },
        { resourceId: 2, resourceTitle: 'track2' },
        { resourceId: 3, resourceTitle: 'track3' },
      ]
    //const localizer = BigCalendar.momentLocalizer(moment)
    const localizer = momentLocalizer(moment)
    const showEventDetails = (event) => {
        event && event.eventDetails?  setModalShow(true) : setModalShow(false);
        console.log(event)
        setModalContent(event);
    }

    return (
        <>
            <Container>
            <Calendar
                events={events}
                localizer={localizer}
                defaultView={Views.DAY}
                views={['day', 'week']}
                step={60}
                defaultDate={new Date()}
                resources={resourceMap}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
                onSelectEvent={event => showEventDetails(event)}
            />
            
            </Container>
            {modalContent && (
                <Modal show={modalShow}>
                    <Modal.Header>
                    <Modal.Title>{modalContent.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    { modalContent.eventDetails && modalContent.eventDetails.youtube && (
                        <p>Youtube Link: {modalContent.eventDetails.youtube}</p>
                    )}
                    { modalContent.eventDetails && modalContent.eventDetails.venue && (
                        <p>Venue: {modalContent.eventDetails.venue}</p>
                    )}
                    { modalContent.eventDetails && modalContent.eventDetails.speaker && (
                        <p>Speaker: {modalContent.eventDetails.speaker}</p>
                    )}
                        
                        {/* <p>{modalContent.eventDetails.youtube}</p>
                        <p>{modalContent.eventDetails.venue}</p> */}
                    </Modal.Body>
                    <Modal.Footer>
                    <button onClick={()=>setModalShow(false)}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}